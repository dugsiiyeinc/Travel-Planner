import React from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BlogBudgetTravel = () => {
  return (
    <div className="bg-[#0E0F2C] text-white min-h-screen">
      <Navbar />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back Button */}
          <NavLink
            to="/"
            className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </NavLink>
          <article className="prose prose-invert max-w-none">
            <div className="relative h-96 w-full mb-12 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Budget travel"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How to Travel on a Budget Without Missing Out
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              Traveling affordably doesn't mean sacrificing quality experiences.
              With smart planning and these insider tips, you can explore the
              world without breaking the bank.
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              1. Flight Hacking 101
            </h2>
            <p>
              <strong>Use flight comparison tools</strong> like Google Flights,
              Skyscanner, and Kayak. Set price alerts for your desired routes.
              Consider:
              <ul className="list-disc pl-6 mt-2">
                <li>Flying mid-week (Tuesday-Thursday) for cheaper fares</li>
                <li>
                  Booking 6-8 weeks in advance for domestic, 3-5 months for
                  international
                </li>
                <li>Using budget airlines for short-haul flights</li>
                <li>Exploring alternative airports near your destination</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              2. Accommodation Alternatives
            </h2>
            <p>
              Beyond hotels, consider:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  <strong>Hostels:</strong> Many offer private rooms at hotel
                  prices
                </li>
                <li>
                  <strong>Homestays:</strong> Platforms like Airbnb often
                  provide kitchen access
                </li>
                <li>
                  <strong>House sitting:</strong> Care for homes in exchange for
                  free stays
                </li>
                <li>
                  <strong>Monasteries/convents:</strong> Some offer simple,
                  affordable rooms
                </li>
                <li>
                  <strong>Camping:</strong> Many destinations have excellent
                  campgrounds
                </li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              3. Eating Like a Local
            </h2>
            <p>
              Food costs can make or break your budget:
              <ul className="list-disc pl-6 mt-2">
                <li>Shop at local markets and grocery stores</li>
                <li>
                  Eat where locals eat - avoid restaurants in tourist areas
                </li>
                <li>Try street food for authentic, affordable meals</li>
                <li>Book accommodations with kitchen facilities</li>
                <li>Take advantage of hotel/hostel breakfasts</li>
                <li>Carry reusable utensils and containers for leftovers</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              4. Free & Low-Cost Activities
            </h2>
            <p>
              Every destination offers budget-friendly experiences:
              <ul className="list-disc pl-6 mt-2">
                <li>Free walking tours (tip your guide)</li>
                <li>Museum free days (often once a week/month)</li>
                <li>Public parks and gardens</li>
                <li>University lectures and cultural events</li>
                <li>Hiking and nature trails</li>
                <li>Architecture walks and self-guided tours</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              5. Transportation Savings
            </h2>
            <p>
              Getting around affordably:
              <ul className="list-disc pl-6 mt-2">
                <li>Public transit passes (weekly/monthly often best value)</li>
                <li>Bike-sharing programs</li>
                <li>Walking (the ultimate free transport)</li>
                <li>Ride-sharing apps for longer distances</li>
                <li>Overnight trains/buses to save on accommodation</li>
              </ul>
            </p>

            <div className="mt-12 p-6 bg-[#1B1C3D] rounded-xl">
              <h3 className="text-xl font-semibold mb-4">
                Budget Travel Pro Tips
              </h3>
              <p>
                <strong>Travel offseason:</strong> Prices drop significantly,
                and crowds thin. Shoulder seasons (just before/after peak) offer
                the best balance of good weather and lower prices.
              </p>
              <p className="mt-4">
                <strong>Loyalty programs:</strong> Sign up for airline, hotel,
                and credit card rewards programs. Points can add up to free
                flights and stays.
              </p>
              <p className="mt-4">
                <strong>Travel insurance:</strong> While an added cost, it can
                save thousands in emergencies. Compare policies for the best
                coverage at the lowest price.
              </p>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogBudgetTravel;
