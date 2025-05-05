import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sampleTrips from '../data/trips.json';
import { useThemeStyles } from "../hooks/useThemeStyles";

const travelImages = [
  "https://images.unsplash.com/photo-1501425359013-96058e410cfc",
  "https://images.unsplash.com/photo-1617046774731-b2c14cc8c377",
  "https://images.unsplash.com/photo-1639060015191-9d83063eab2a",
  "https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e",
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f",
  "https://images.unsplash.com/photo-1518684079-3c830dcef090",
  "https://images.unsplash.com/photo-1531572753322-ad063cecc140",
  "https://images.unsplash.com/photo-1492571350019-22de08371fd3",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e",
  "https://images.unsplash.com/photo-1554366347-897a5113f6ab?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const CreateTrip = () => {
  const { addTrip } = useContext(TripContext);
  const navigate = useNavigate();
  const themeStyles = useThemeStyles();

  const [tripData, setTripData] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
    status: "upcoming",
    image: travelImages[0],
    itinerary: []
  });

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplates, setShowTemplates] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (imageUrl) => {
    setTripData(prev => ({ ...prev, image: imageUrl }));
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    setTripData({
      ...template,
      startDate: "",
      endDate: "",
      itinerary: []
    });
    setShowTemplates(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!tripData.startDate || !tripData.endDate) {
      toast.error("Please select start and end dates");
      return;
    }

    const startDate = new Date(tripData.startDate);
    const endDate = new Date(tripData.endDate);
    
    if (startDate > endDate) {
      toast.error("End date must be after start date");
      return;
    }

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    const itinerary = [];
    for (let i = 0; i < diffDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      itinerary.push({
        day: i + 1,
        date: date.toISOString().split('T')[0],
        activities: i === 0 
          ? ["Arrival day - plan your activities"] 
          : [`Day ${i + 1} activities - add details later`]
      });
    }

    try {
      const newTrip = {
        ...tripData,
        itinerary: itinerary
      };
      
      await addTrip(newTrip);
      toast.success("Trip created successfully!");
      navigate("/mytrip");
    } catch (error) {
      toast.error("Failed to create trip");
      console.error(error);
    }
  };

  return (
    <div className={`${themeStyles.bg} ${themeStyles.text} min-h-screen`}>
      <Navbar />
      <main className="pt-20">
        <section className={`flex flex-col items-center text-center px-6 py-12 bg-gradient-to-b ${themeStyles.gradientFrom} ${themeStyles.gradientTo}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
            Plan Your Next Adventure with <span className="text-blue-400">Ease</span>
          </h1>
          <p className={`text-lg md:text-xl ${themeStyles.secondaryText} max-w-2xl mb-8`}>
            Create your dream trip with all the details and manage everything in one place.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12">
          {showTemplates ? (
            <div className={`${themeStyles.cardBg} rounded-2xl shadow-xl overflow-hidden p-6`}>
              <h2 className="text-2xl font-semibold mb-6 text-center">Select a Trip Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleTrips.map(trip => (
                  <div 
                    key={trip.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTemplate === trip.id ? 
                      'border-blue-500 bg-blue-500/10' : `${themeStyles.border} hover:bg-opacity-50 hover:bg-gray-500`}`}
                    onClick={() => handleTemplateSelect(trip)}
                  >
                    <div className="flex items-center gap-4">
                      <img 
                        src={trip.image} 
                        alt={trip.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{trip.name}</h3>
                        <p className={`text-sm ${themeStyles.secondaryText}`}>{trip.destination}</p>
                      </div>
                    </div>
                    <p className={`text-sm ${themeStyles.secondaryText} mt-2 line-clamp-2`}>{trip.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowTemplates(false)}
                  className={`${themeStyles.buttonPrimary} text-white font-semibold px-6 py-2 rounded-lg transition-colors`}
                  disabled={!selectedTemplate}
                >
                  Continue with Selected Template
                </button>
              </div>
            </div>
          ) : (
            <div className={`${themeStyles.cardBg} rounded-2xl shadow-xl overflow-hidden`}>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Create Your Trip</h2>
                  <button
                    onClick={() => setShowTemplates(true)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Change Template
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block ${themeStyles.secondaryText} mb-2`}>Trip Name</label>
                      <input
                        type="text"
                        name="name"
                        value={tripData.name}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 ${themeStyles.cardBg} ${themeStyles.border} rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    <div>
                      <label className={`block ${themeStyles.secondaryText} mb-2`}>Destination</label>
                      <input
                        type="text"
                        name="destination"
                        value={tripData.destination}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 ${themeStyles.cardBg} ${themeStyles.border} rounded-lg  focus:ring-2 border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block ${themeStyles.secondaryText} mb-2`}>Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={tripData.startDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full p-3 ${themeStyles.cardBg} ${themeStyles.border} border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                    <div>
                      <label className={`block ${themeStyles.secondaryText} mb-2`}>End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={tripData.endDate}
                        onChange={handleChange}
                        required
                        min={tripData.startDate || new Date().toISOString().split('T')[0]}
                        className={`w-full p-3 ${themeStyles.cardBg} ${themeStyles.border} rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block ${themeStyles.secondaryText} mb-2`}>Budget ($)</label>
                    <input
                      type="number"
                      name="budget"
                      value={tripData.budget}
                      onChange={handleChange}
                      required
                      min="0"
                      className={`w-full p-3 ${themeStyles.cardBg} ${themeStyles.border} rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>

                  <div>
                    <label className={`block ${themeStyles.secondaryText} mb-2`}>Description</label>
                    <textarea
                      name="description"
                      value={tripData.description}
                      onChange={handleChange}
                      rows="4"
                      className={`w-full p-3 ${themeStyles.cardBg} ${themeStyles.border} rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>

                  <div>
                    <label className={`block ${themeStyles.secondaryText} mb-2`}>Trip Image</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {travelImages.map((image) => (
                        <div 
                          key={image} 
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 ${tripData.image === image ? 'border-blue-500' : 'border-transparent'}`}
                          onClick={() => handleImageSelect(image)}
                        >
                          <img 
                            src={image} 
                            alt="Travel destination"
                            className="w-full h-24 object-cover"
                          />
                          {tripData.image === image && (
                            <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                              <div className="bg-blue-500 rounded-full p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className={`w-full ${themeStyles.buttonPrimary} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors`}
                    >
                      Create Trip
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
        </section>
      </main>
    </div>
  );
};

export default CreateTrip;