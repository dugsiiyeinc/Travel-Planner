import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTrip } from "../context/TripContext";
import { useThemeStyles } from "../hooks/useThemeStyles";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import TripCard from "../components/TripCard";
import { Plus, Loader2 } from "lucide-react";

const MyTrips = () => {
  const { trips, loading, error, fetchTrips, clearError } = useTrip();
  const { user } = useAuth();
  const navigate = useNavigate();
  const themeStyles = useThemeStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        fetchTrips();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [user, fetchTrips]);

  const handleCreateNew = () => navigate("/createtrip");
  const handleTripClick = (tripId) => navigate(`/mytrip/${tripId}`);

  const handleRetry = () => {
    clearError();
    fetchTrips();
  };

  if (!user) {
    return (
      <div className={`${themeStyles.bg} min-h-screen`}>
        <Navbar />
        <div className="pt-20 flex flex-col items-center justify-center h-[calc(100vh-5rem)] px-6">
          <div className={`${themeStyles.cardBg} rounded-xl shadow-md p-8 max-w-md text-center`}>
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

  if (loading && trips.length === 0) {
    return (
      <div className={`${themeStyles.bg} ${themeStyles.text} min-h-screen`}>
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-[calc(100vh-5rem)]">
          <div className="flex flex-col items-center">
            <Loader2 className="animate-spin h-12 w-12 mb-4" />
            <p>Loading your trips...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${themeStyles.bg} ${themeStyles.text} min-h-screen`}>
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-[calc(100vh-5rem)] px-6">
          <div className={`${themeStyles.cardBg} rounded-xl shadow-md p-8 max-w-md text-center`}>
            <h2 className="text-2xl font-semibold mb-4">Error Loading Trips</h2>
            <p className={`${themeStyles.secondaryText} mb-6`}>
              {error.message}
            </p>
            <button
              onClick={handleRetry}
              className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-2 rounded-lg`}
            >
              Retry
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
        <section className={`flex flex-col items-center text-center px-6 py-12 bg-gradient-to-b ${themeStyles.gradientFrom} ${themeStyles.gradientTo}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-blue-400">Trips</span>
          </h1>
          <p className={`text-lg ${themeStyles.secondaryText} max-w-2xl mb-6`}>
            All your planned and completed adventures in one place
          </p>
          <button
            onClick={handleCreateNew}
            className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors hover:shadow-md`}
          >
            <Plus size={20} /> New Trip
          </button>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          {trips.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {trips.length} {trips.length === 1 ? "Trip" : "Trips"}
                </h2>
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
            <div className={`${themeStyles.cardBg} rounded-xl shadow-md p-8 max-w-md mx-auto text-center`}>
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
              <p className={`${themeStyles.secondaryText} mb-6`}>
                Start by creating your first adventure!
              </p>
              <button
                onClick={handleCreateNew}
                className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-2 rounded-lg`}
              >
                Create Trip
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyTrips;