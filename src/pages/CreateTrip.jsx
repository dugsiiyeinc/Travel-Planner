import React from "react";
import Navbar from "./Navbar";

const CreateTrip = () => {
  return (
    <div className="bg-[#0E0F2C] text-white min-h-screen">
      <Navbar />
      
      <main className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plan Your <span className="text-blue-400">Perfect Trip</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Fill in the details below to create your personalized travel itinerary.
          </p>
        </div>
        
        <div className="bg-[#1B1C3D] rounded-2xl shadow-xl p-6 md:p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-300 mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  id="destination"
                  className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Where are you going?"
                />
              </div>
              
              <div>
                <label htmlFor="trip-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Trip Name
                </label>
                <input
                  type="text"
                  id="trip-name"
                  className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Give your trip a name"
                />
              </div>
              
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Trip Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Tell us about your trip plans..."
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
              >
                Create Trip
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateTrip;