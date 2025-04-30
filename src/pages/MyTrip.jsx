import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { Plus } from "lucide-react";
import TripCard from "../components/TripCard";
import { useThemeStyles } from "../hooks/useThemeStyles";

const MyTrips = () => {
  const { trips, error, fetchTrips } = useTrip();
  const navigate = useNavigate();
  const themeStyles = useThemeStyles();

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const handleCreateNew = () => navigate("/createtrip");
  const handleTripClick = (tripId) => navigate(`/mytrip/${tripId}`);

  return (
    <div className={`${themeStyles.bg} ${themeStyles.text} min-h-screen`}>
      <Navbar />
      <main className="pt-20">
        <section className={`flex flex-col items-center text-center px-6 py-12 bg-gradient-to-b ${themeStyles.gradientFrom} ${themeStyles.gradientTo}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-blue-400">Trips</span>
          </h1>
          <p className={`text-lg ${themeStyles.secondaryText} max-w-2xl mb-6`}>
            All your planned and completed adventures in one place
          </p>
          <button
            onClick={handleCreateNew}
            className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors`}
          >
            <Plus /> New Trip
          </button>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          {error ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg 
                  className="w-24 h-24 mx-auto text-red-500 mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="1.5" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
                <h3 className="text-xl font-medium text-red-400 mb-2">
                  Error loading trips
                </h3>
                <p className={themeStyles.secondaryText}>
                  {error.message || "Failed to load your trips. Please try again."}
                </p>
                <button
                  onClick={fetchTrips}
                  className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-2 rounded-lg transition-colors`}
                >
                  Retry
                </button>
              </div>
            </div>
          ) : trips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map(trip => (
                <TripCard 
                  key={trip.id} 
                  trip={trip} 
                  onClick={() => handleTripClick(trip.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
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
                <h3 className={`text-xl font-medium ${themeStyles.secondaryText} mb-2`}>
                  No trips planned yet
                </h3>
                <p className={themeStyles.secondaryText}>
                  Start by creating your first adventure!
                </p>
                <button
                  onClick={handleCreateNew}
                  className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-2 rounded-lg transition-colors`}
                >
                  Create Your First Trip
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyTrips;