import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { Plus, RefreshCw } from "lucide-react";
import TripCard from "../components/TripCard";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useAuth } from "../context/AuthContext";

const MyTrips = () => {
  const { trips, fetchTrips } = useTrip();
  const { user } = useAuth();
  const navigate = useNavigate();
  const themeStyles = useThemeStyles();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Prevent accidental page reload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Only show warning if there are trips
      if (trips.length > 0) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave? Your trips data will be saved, but any unsaved changes might be lost.";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [trips]);

  // Fetch trips from Supabase when user is authenticated
  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [fetchTrips, user]);

  const handleCreateNew = () => navigate("/createtrip");
  const handleTripClick = (tripId) => navigate(`/mytrip/${tripId}`);

  const handleRefresh = async (e) => {
    e.preventDefault();
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await fetchTrips();
    } catch (error) {
      console.error("Failed to refresh trips:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!user) {
    return (
      <div className={`${themeStyles.bg} min-h-screen`}>
        <Navbar />
        <div className="pt-20 flex flex-col items-center justify-center h-[calc(100vh-5rem)] px-6">
          <div
            className={`${themeStyles.cardBg} rounded-xl shadow-md p-8 max-w-md text-center`}
          >
            <h2 className="text-2xl font-semibold mb-4">Please Sign In</h2>
            <p className={`${themeStyles.secondaryText} mb-6`}>
              You need to be signed in to view your trips.
            </p>
            <button
              onClick={() => navigate("/signin")}
              className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-2 rounded-lg`}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${themeStyles.bg} ${themeStyles.text} min-h-screen`}>
      <Navbar />
      <main className="pt-20">
        <section
          className={`flex flex-col items-center text-center px-6 py-12 bg-gradient-to-b ${themeStyles.gradientFrom} ${themeStyles.gradientTo}`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-blue-400">Trips</span>
          </h1>
          <p className={`text-lg ${themeStyles.secondaryText} max-w-2xl mb-6`}>
            All your planned and completed adventures in one place
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleCreateNew}
              className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors hover:shadow-md`}
            >
              <Plus size={20} /> New Trip
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`${
                themeStyles.buttonSecondary
              } font-semibold px-4 py-3 rounded-lg flex items-center gap-2 transition-colors hover:shadow-md ${
                isRefreshing ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              <RefreshCw
                size={20}
                className={isRefreshing ? "animate-spin" : ""}
              />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          {trips.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {trips.length} {trips.length === 1 ? "Trip" : "Trips"}
                </h2>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={`flex items-center gap-2 ${
                    themeStyles.secondaryText
                  } text-sm ${
                    isRefreshing ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  <RefreshCw
                    size={16}
                    className={isRefreshing ? "animate-spin" : ""}
                  />
                  Refresh
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    onClick={() => handleTripClick(trip.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div
              className={`${themeStyles.cardBg} rounded-xl shadow-md p-8 max-w-md mx-auto text-center`}
            >
              <svg
                className="w-24 h-24 mx-auto text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3
                className={`text-xl font-medium ${themeStyles.secondaryText} mb-2`}
              >
                No trips planned yet
              </h3>
              <p className={`${themeStyles.secondaryText} mb-6`}>
                Start by creating your first adventure!
              </p>
              <button
                onClick={handleCreateNew}
                className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto`}
              >
                <Plus size={18} /> Create Your First Trip
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyTrips;
