import React from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";

// Sample trip data - in a real app, this would come from an API
const sampleTrips = [
  {
    id: "1",
    name: "European Adventure",
    destination: "Paris, France",
    startDate: "2025-06-15",
    endDate: "2025-06-30",
    budget: 3500,
    description: "Two-week romantic getaway to Paris with day trips to nearby cities.",
    image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "upcoming",
    itinerary: [
      {
        day: 1,
        date: "2025-06-15",
        activities: [
          "Arrival in Paris",
          "Check-in at hotel",
          "Evening walk along Seine River"
        ]
      },
      {
        day: 2,
        date: "2025-06-16",
        activities: [
          "Eiffel Tower visit",
          "Lunch at local bistro",
          "Louvre Museum tour"
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Beach Getaway",
    destination: "Bali, Indonesia",
    startDate: "2025-03-05",
    endDate: "2025-03-15",
    budget: 2800,
    description: "Relaxing 10-day vacation in Bali with beach hopping and cultural tours.",
    image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "completed",
    itinerary: [
      {
        day: 1,
        date: "2025-03-05",
        activities: [
          "Arrival in Bali",
          "Transfer to resort",
          "Welcome dinner"
        ]
      }
    ]
  }
];

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  
  const trip = sampleTrips.find(t => t.id === tripId);
  
  if (!trip) {
    return (
      <div className="bg-[#0E0F2C] text-white min-h-screen">
        <Navbar />
        <div className="pt-20 text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Trip Not Found</h1>
          <button 
            onClick={() => navigate("/mytrip")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to My Trips
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-[#0E0F2C] text-white min-h-screen">
      <Navbar />
      
      <main className="pt-20">
        {/* Trip Header */}
        <div className="relative h-64 md:h-96 w-full">
          <img
            src={trip.image}
            alt={trip.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F2C] to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{trip.name}</h1>
            <p className="text-xl md:text-2xl text-blue-400">{trip.destination}</p>
          </div>
        </div>

        {/* Trip Details */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-[#1B1C3D] rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Trip Overview</h2>
                <p className="text-gray-300 mb-6">{trip.description}</p>
                
                <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
                {trip.itinerary.map((day) => (
                  <div key={day.day} className="mb-6 last:mb-0">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        <span className="font-medium">{day.day}</span>
                      </div>
                      <h4 className="text-lg font-medium">{formatDate(day.date)}</h4>
                    </div>
                    <ul className="ml-11 space-y-2">
                      {day.activities.map((activity, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="bg-[#1B1C3D] rounded-xl p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-4">Trip Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Dates</p>
                    <p className="font-medium">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Budget</p>
                    <p className="font-medium">${trip.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className={`font-medium ${
                      trip.status === "upcoming" ? "text-green-400" : "text-gray-400"
                    }`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                    Edit Trip
                  </button>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg">
                    Share Trip
                  </button>
                  <button 
                    onClick={() => navigate("/mytrip")}
                    className="w-full bg-transparent border border-gray-600 hover:bg-gray-700/50 text-white py-2 px-4 rounded-lg"
                  >
                    Back to My Trips
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TripDetails;