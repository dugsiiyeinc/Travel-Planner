import { format } from "date-fns";

const TripCard = ({ trip, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-[#1B1C3D] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer hover:translate-y-[-4px] transition-transform"
    >
      <div className="relative h-48">
        <img
          src={trip.image}
          alt={trip.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            trip.status === "upcoming" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
          }`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1">{trip.name}</h3>
        <p className="text-gray-400 text-sm mb-2">{trip.destination}</p>
        <p className="text-blue-400 text-sm mb-3">
          {format(new Date(trip.startDate), 'MMM d')} - {format(new Date(trip.endDate), 'MMM d, yyyy')}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-medium">${trip.budget.toLocaleString()}</span>
          <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2">
            View Details <ArrowRight className="w-4 h-4" /> {/* Added ArrowRight icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;

