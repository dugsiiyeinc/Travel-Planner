import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { Plus } from "lucide-react";
import TripCard from "../components/TripCard";

const MyTrips = () => {
  const { trips } = useContext(TripContext);
  const navigate = useNavigate();

  const handleCreateNew = () => navigate("/createtrip");
  const handleTripClick = (tripId) => navigate(`/mytrip/${tripId}`);

  return (
    <div className="bg-[#0E0F2C] text-white min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="flex flex-col items-center text-center px-6 py-12 bg-gradient-to-b from-[#0E0F2C] to-[#151635]">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-blue-400">Trips</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-6">
            All your planned and completed adventures in one place
          </p>
          <button
            onClick={handleCreateNew}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus /> New Trip
          </button>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          {trips.length > 0 ? (
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
                <svg className="w-24 h-24 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-xl font-medium text-gray-400 mb-2">No trips planned yet</h3>
                <p className="text-gray-500 mb-6">Start by creating your first adventure!</p>
                <button
                  onClick={handleCreateNew}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
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