import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { Plus, ArrowRight, MapPin, Calendar, DollarSign, Smile, Frown } from "lucide-react";
import TripCard from "../components/TripCard";
import { useThemeStyles } from "../hooks/useThemeStyles";

const MyTrips = () => {
  const { trips, error, fetchTrips, loading } = useTrip();
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
            <Plus size={18} /> New Trip
          </button>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Frown className="w-24 h-24 mx-auto text-red-500 mb-4" />
                <h3 className="text-xl font-medium text-red-400 mb-2">
                  Error loading trips
                </h3>
                <p className={themeStyles.secondaryText}>
                  {error.message || "Failed to load your trips. Please try again."}
                </p>
                <button
                  onClick={fetchTrips}
                  className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-2 rounded-lg transition-colors mt-4`}
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
                <Smile className="w-24 h-24 mx-auto text-gray-500 mb-4" />
                <h3 className={`text-xl font-medium ${themeStyles.secondaryText} mb-2`}>
                  No trips planned yet
                </h3>
                <p className={themeStyles.secondaryText}>
                  Start by creating your first adventure!
                </p>
                <button
                  onClick={handleCreateNew}
                  className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-2 rounded-lg transition-colors mt-4`}
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