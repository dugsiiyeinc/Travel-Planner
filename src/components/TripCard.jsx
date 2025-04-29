import React from "react";
import { format } from "date-fns";
import { ArrowRight, MapPin, Calendar, DollarSign } from "lucide-react";

const TripCard = ({ trip, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-[#1B1C3D] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer hover:translate-y-[-4px] group"
    >
      <div className="relative h-48">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            trip.status === "upcoming" 
              ? "bg-green-500/20 text-green-400" 
              : trip.status === "completed" 
                ? "bg-blue-500/20 text-blue-400"
                : "bg-gray-500/20 text-gray-400"
          }`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{trip.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{trip.destination}</span>
        </div>
        
        <div className="flex items-center gap-2 text-blue-400 text-sm mb-3">
          <Calendar className="w-4 h-4" />
          <span>
            {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
          </span>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-700/50">
          <div className="flex items-center gap-2 font-medium">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>${trip.budget.toLocaleString()}</span>
          </div>
          <button 
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View Details <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;