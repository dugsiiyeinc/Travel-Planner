import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { TripContext } from "../context/TripContext";
import { format, parseISO } from "date-fns";
import { 
  Edit2, Share2, Trash2, ArrowLeft, Plus, Minus, X, 
  Twitter, Facebook, MessageSquare, CreditCard, MapPin, Calendar, 
  DollarSign, Circle, ChevronDown, ChevronUp, Loader2
} from "lucide-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TripDetails = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { trips, updateTrip, deleteTrip } = useContext(TripContext);
  const [isEditing, setIsEditing] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [expandedDays, setExpandedDays] = useState({});
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    const trip = trips.find(t => t.id === tripId);
    if (trip) {
      setTripData(trip);
      const initialExpanded = {};
      trip.itinerary.forEach(day => {
        initialExpanded[day.day] = true;
      });
      setExpandedDays(initialExpanded);
    } else {
      navigate("/mytrip");
    }
  }, [tripId, trips, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsProcessing(true);
    updateTrip(tripData);
    setTimeout(() => {
      setIsProcessing(false);
      setIsEditing(false);
      toast.success("Trip updated successfully!");
    }, 800);
  };

  const handleDelete = () => {
    const toastId = toast(
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <button 
            onClick={() => toast.dismiss(toastId)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mb-6 text-gray-300">Are you sure you want to delete this trip permanently?</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => toast.dismiss(toastId)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={async () => {
              try {
                setIsProcessing(true);
                await deleteTrip(tripId);
                toast.dismiss(toastId);
                setTimeout(() => {
                  navigate("/mytrip");
                  toast.success("Trip deleted successfully!");
                }, 300);
              } catch (error) {
                toast.error("Failed to delete trip", error);
                setIsProcessing(false);
              }
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : "Delete"}
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        className: 'bg-[#1B1C3D] border-l-4 border-red-500 shadow-xl',
      }
    );
  };

  const handlePayment = () => {
    const toastId = toast(
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Confirm Payment</h3>
          <button 
            onClick={() => toast.dismiss(toastId)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <p className="mb-6 text-gray-300">Proceed with payment for {tripData.name}?</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={() => toast.dismiss(toastId)}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              setIsProcessing(true);
              toast.dismiss(toastId);
              setTimeout(() => {
                setIsProcessing(false);
                toast.success(
                  <div className="flex items-center">
                    <span className="mr-2">Payment completed successfully!</span>
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                );
              }, 1500);
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : "Confirm Payment"}
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        className: 'bg-[#1B1C3D] border-l-4 border-green-500 shadow-xl',
      }
    );
  };

  const handleShare = (platform) => {
    const tripUrl = `${window.location.origin}/mytrip/${tripId}`;
    const message = `Check out my trip to ${tripData.destination}: ${tripData.name}`;
    
    switch(platform) {
      case 'copy':
        navigator.clipboard.writeText(tripUrl);
        toast.success(
          <div className="flex items-center">
            <span className="mr-2">Trip link copied to clipboard!</span>
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
        setShowShareOptions(false);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(tripUrl)}`, '_blank');
        setShowShareOptions(false);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tripUrl)}`, '_blank');
        setShowShareOptions(false);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${message} ${tripUrl}`)}`, '_blank');
        setShowShareOptions(false);
        break;
      default:
        break;
    }
  };

  const toggleDayExpand = (day) => {
    setExpandedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const addActivity = (dayIndex) => {
    if (!isEditing) return;
    
    const updatedItinerary = [...tripData.itinerary];
    updatedItinerary[dayIndex].activities.push("New activity - click to edit");
    
    setTripData(prev => ({
      ...prev,
      itinerary: updatedItinerary
    }));
  };

  const removeActivity = (dayIndex, activityIndex) => {
    if (!isEditing) return;
    
    const updatedItinerary = [...tripData.itinerary];
    updatedItinerary[dayIndex].activities.splice(activityIndex, 1);
    
    setTripData(prev => ({
      ...prev,
      itinerary: updatedItinerary
    }));
  };

  const updateActivity = (dayIndex, activityIndex, newValue) => {
    const updatedItinerary = [...tripData.itinerary];
    updatedItinerary[dayIndex].activities[activityIndex] = newValue;
    
    setTripData(prev => ({
      ...prev,
      itinerary: updatedItinerary
    }));
  };

  if (!tripData) return (
    <div className="flex items-center justify-center min-h-screen bg-[#0E0F2C]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  );

  return (
    <div className="bg-[#0E0F2C] text-white min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <div className="relative h-72 md:h-[28rem] w-full overflow-hidden">
          <img
            src={tripData.image}
            alt={tripData.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F2C] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col space-y-3">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={tripData.name}
                    onChange={handleChange}
                    className="text-3xl md:text-4xl font-bold bg-transparent border-b-2 border-blue-400 focus:outline-none text-white placeholder-white/70"
                    placeholder="Trip name"
                  />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {tripData.name}
                  </h1>
                )}
                <div className="flex items-center space-x-2">
                  <MapPin className="text-blue-400" size={18} />
                  {isEditing ? (
                    <input
                      type="text"
                      name="destination"
                      value={tripData.destination}
                      onChange={handleChange}
                      className="text-lg md:text-xl bg-transparent border-b border-blue-400 focus:outline-none text-blue-300 placeholder-blue-300/70"
                      placeholder="Destination"
                    />
                  ) : (
                    <p className="text-lg md:text-xl text-blue-300 font-medium">
                      {tripData.destination}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trip Overview Card */}
              <div className="bg-[#1B1C3D] rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Trip Overview</h2>
                    {isEditing && (
                      <button
                        onClick={handleSave}
                        disabled={isProcessing}
                        className={`bg-green-600 hover:bg-green-500 text-white px-5 py-2.5 rounded-lg transition-all flex items-center space-x-2 shadow-md hover:shadow-lg ${isProcessing ? 'opacity-80 cursor-not-allowed' : ''}`}
                      >
                        {isProcessing ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <span>Save Changes</span>
                        )}
                      </button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <textarea
                      name="description"
                      value={tripData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-4 bg-[#252747] border border-gray-700 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-300 placeholder-gray-500 transition-all"
                      placeholder="Describe your trip..."
                    />
                  ) : (
                    <p className="text-gray-300 mb-6 leading-relaxed">{tripData.description}</p>
                  )}
                  
                  <h3 className="text-xl font-bold text-white mb-6">Itinerary</h3>
                  <div className="space-y-4">
                    {tripData.itinerary.map((day, dayIndex) => (
                      <div key={day.day} className="bg-[#252747] p-5 rounded-xl border border-gray-700 hover:border-blue-400 transition-all">
                        <div 
                          className="flex items-center justify-between mb-4 cursor-pointer group"
                          onClick={() => toggleDayExpand(day.day)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-500 rounded-full w-9 h-9 flex items-center justify-center text-white font-medium shadow-sm group-hover:bg-blue-600 transition-colors">
                              {day.day}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-white">
                                {format(parseISO(day.date), 'EEEE, MMMM d, yyyy')}
                              </h4>
                              <p className="text-sm text-gray-400">
                                {day.activities.length} {day.activities.length === 1 ? 'activity' : 'activities'}
                              </p>
                            </div>
                          </div>
                          {expandedDays[day.day] ? (
                            <ChevronUp className="text-gray-400 group-hover:text-gray-300 transition-colors" size={20} />
                          ) : (
                            <ChevronDown className="text-gray-400 group-hover:text-gray-300 transition-colors" size={20} />
                          )}
                        </div>
                        {expandedDays[day.day] && (
                          <div className="ml-14 space-y-3">
                            {day.activities.map((activity, activityIndex) => (
                              <div key={activityIndex} className="flex items-start p-3 bg-[#1B1C3D] rounded-lg border border-gray-700 hover:bg-[#252747] transition-all">
                                {isEditing ? (
                                  <>
                                    <input
                                      type="text"
                                      value={activity}
                                      onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                                      className="flex-grow p-2 bg-[#252747] border border-gray-600 rounded text-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    />
                                    <button
                                      onClick={() => removeActivity(dayIndex, activityIndex)}
                                      className="ml-3 p-1.5 text-red-400 hover:text-red-300 hover:bg-[#252747] rounded-full transition-colors"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex-shrink-0 mt-1 mr-3">
                                      <Circle className="w-2 h-2 text-blue-400 fill-current" />
                                    </div>
                                    <p className="text-gray-300 flex-grow">{activity}</p>
                                  </>
                                )}
                              </div>
                            ))}
                            {isEditing && (
                              <button
                                onClick={() => addActivity(dayIndex)}
                                className="flex items-center text-sm text-blue-400 hover:text-blue-300 ml-3 mt-2 transition-colors"
                              >
                                <Plus size={16} className="mr-2" />
                                Add Activity
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Trip Details Card */}
              <div className="bg-[#1B1C3D] rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Trip Details</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Calendar className="mr-2 text-gray-500" size={16} />
                        <span>Dates</span>
                      </div>
                      {isEditing ? (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                            <input
                              type="date"
                              name="startDate"
                              value={tripData.startDate}
                              onChange={handleChange}
                              className="w-full p-2.5 bg-[#252747] border border-gray-700 rounded-lg text-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">End Date</label>
                            <input
                              type="date"
                              name="endDate"
                              value={tripData.endDate}
                              onChange={handleChange}
                              min={tripData.startDate}
                              className="w-full p-2.5 bg-[#252747] border border-gray-700 rounded-lg text-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="font-medium text-gray-300">
                          {format(parseISO(tripData.startDate), 'MMM d, yyyy')} - {format(parseISO(tripData.endDate), 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <DollarSign className="mr-2 text-gray-500" size={16} />
                        <span>Budget</span>
                      </div>
                      {isEditing ? (
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-300">$</span>
                          <input
                            type="number"
                            name="budget"
                            value={tripData.budget}
                            onChange={handleChange}
                            className="w-full p-2.5 bg-[#252747] border border-gray-700 rounded-lg text-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          />
                        </div>
                      ) : (
                        <p className="font-medium text-gray-300">${tripData.budget.toLocaleString()}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <span className="w-4 h-4 mr-2 flex items-center justify-center">
                          <span className={`w-2 h-2 rounded-full ${
                            tripData.status === "upcoming" ? "bg-blue-500" : 
                            tripData.status === "completed" ? "bg-green-500" :
                            tripData.status === "in-progress" ? "bg-yellow-500" : "bg-gray-500"
                          }`} />
                        </span>
                        <span>Status</span>
                      </div>
                      {isEditing ? (
                        <select
                          name="status"
                          value={tripData.status}
                          onChange={handleChange}
                          className="w-full p-2.5 bg-[#252747] border border-gray-700 rounded-lg text-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          tripData.status === "upcoming" ? "bg-blue-900/30 text-blue-400" : 
                          tripData.status === "completed" ? "bg-green-900/30 text-green-400" :
                          tripData.status === "in-progress" ? "bg-yellow-900/30 text-yellow-400" : "bg-gray-900/30 text-gray-400"
                        }`}>
                          {tripData.status.charAt(0).toUpperCase() + tripData.status.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Card */}
              <div className="bg-[#1B1C3D] rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                <div className="p-6 md:p-8 space-y-4">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isProcessing}
                    className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-lg transition-all font-medium shadow-sm hover:shadow-md ${isProcessing ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    <Edit2 size={18} /> {isEditing ? "Cancel Editing" : "Edit Trip"}
                  </button>
                  
                  <div className="relative">
                    <button
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      disabled={isProcessing}
                      className={`w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-4 rounded-lg transition-all font-medium shadow-sm hover:shadow-md ${isProcessing ? 'opacity-80 cursor-not-allowed' : ''}`}
                    >
                      <Share2 size={18} /> Share Trip
                    </button>
                    {showShareOptions && (
                      <div className="absolute left-0 right-0 bottom-full mb-2 bg-[#252747] rounded-lg shadow-xl overflow-hidden z-10 border border-gray-700 animate-fadeIn">
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#1B1C3D] transition-colors text-gray-300"
                        >
                          <span>Twitter</span>
                          <Twitter size={18} className="text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#1B1C3D] transition-colors text-gray-300"
                        >
                          <span>Facebook</span>
                          <Facebook size={18} className="text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleShare('whatsapp')}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#1B1C3D] transition-colors text-gray-300"
                        >
                          <span>WhatsApp</span>
                          <MessageSquare size={18} className="text-green-500" />
                        </button>
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#1B1C3D] transition-colors text-gray-300"
                        >
                          <span>Copy Link</span>
                          <Share2 size={18} className="text-gray-400" />
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-3 px-4 rounded-lg transition-all font-medium shadow-sm hover:shadow-md ${isProcessing ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <CreditCard size={18} /> Proceed to Payment
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleDelete}
                    disabled={isProcessing}
                    className={`w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-3 px-4 rounded-lg transition-all font-medium shadow-sm hover:shadow-md ${isProcessing ? 'opacity-80 cursor-not-allowed' : ''}`}
                  >
                    <Trash2 size={18} /> Delete Trip
                  </button>
                  
                  <button
                    onClick={() => navigate("/mytrip")}
                    className="w-full flex items-center justify-center gap-2 bg-transparent border border-gray-700 hover:bg-[#252747] text-gray-300 py-3 px-4 rounded-lg transition-all font-medium"
                  >
                    <ArrowLeft size={18} /> Back to Trips
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TripDetails;