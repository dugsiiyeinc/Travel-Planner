import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // Change from useHistory to useNavigate

const CreateTrip = () => {
  const navigate = useNavigate(); // useNavigate hook instead of useHistory

  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process trip data here (e.g., save to database)
    // Redirect after saving the trip
    navigate("/my-trips"); // use navigate() instead of history.push()
  };

  return (
    <div className="bg-[#0E0F2C] text-white min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center px-6 py-20 bg-gradient-to-b from-[#0E0F2C] to-[#151635]">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
            Plan Your Next Adventure with <span className="text-blue-400">Ease</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
            Create your dream trip with all the details and manage everything in one place.
          </p>
        </section>

        {/* Trip Form */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
            Create Your Trip
          </h2>

          <form onSubmit={handleSubmit} className="bg-[#1B1C3D] p-8 rounded-2xl shadow-lg">
            {/* Trip Name */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2" htmlFor="tripName">
                Trip Name
              </label>
              <input
                type="text"
                id="tripName"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                required
                placeholder="e.g. Honeymoon in Paris"
                className="w-full p-4 bg-[#2A2C47] text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Destination */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2" htmlFor="destination">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                placeholder="e.g. Paris, France"
                className="w-full p-4 bg-[#2A2C47] text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-lg font-medium mb-2" htmlFor="startDate">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full p-4 bg-[#2A2C47] text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-lg font-medium mb-2" htmlFor="endDate">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full p-4 bg-[#2A2C47] text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2" htmlFor="budget">
                Budget ($)
              </label>
              <input
                type="number"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                placeholder="e.g. 5000"
                className="w-full p-4 bg-[#2A2C47] text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2" htmlFor="description">
                Trip Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="4"
                placeholder="Write a brief description of your trip"
                className="w-full p-4 bg-[#2A2C47] text-white rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-md transition-colors w-full md:w-auto"
              >
                Save Trip
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CreateTrip;
