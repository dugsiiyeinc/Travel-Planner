import React from "react";
import Navbar from "./Navbar";

const MyTrips = () => {
  // Sample trip data
  const trips = [
    {
      id: 1,
      name: "European Adventure",
      destination: "Paris, France",
      date: "Jun 15 - Jun 30, 2025",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "Upcoming"
    },
    {
      id: 2,
      name: "Beach Getaway",
      destination: "Bali, Indonesia",
      date: "Mar 5 - Mar 15, 2025",
      image: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "Completed"
    },
    {
      id: 3,
      name: "Business Conference",
      destination: "New York, USA",
      date: "Apr 10 - Apr 14, 2025",
      image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      status: "Upcoming"
    },
  ];

  return (
    <div className="bg-[#0E0F2C] text-white min-h-screen">
      <Navbar />
      
      <main className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              My <span className="text-blue-400">Trips</span>
            </h1>
            <p className="text-gray-400">
              All your planned and completed adventures in one place
            </p>
          </div>
          <a
            href="/create-trip"
            className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Trip
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-[#1B1C3D] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  trip.status === "Upcoming" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                }`}>
                  {trip.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{trip.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{trip.destination}</p>
                <p className="text-blue-400 text-sm font-medium">{trip.date}</p>
                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
                  <a
                    href={`/trip/${trip.id}`}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    View Details
                  </a>
                  <button className="text-sm text-gray-400 hover:text-white">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyTrips;