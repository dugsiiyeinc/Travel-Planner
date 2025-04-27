import React from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BlogPackingGuide = () => {
  return (
    <div className="bg-[#0E0F2C] text-white min-h-screen">
      <Navbar />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-6 py-12">
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
                src="https://images.unsplash.com/photo-1643779375222-81cbf9c15c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Packing luggage"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Packing Like a Pro: Tips You Need</h1>
            <p className="text-xl text-gray-300 mb-8">
              Mastering the art of packing can transform your travel experience. These professional 
              tips will help you pack efficiently, avoid baggage fees, and ensure you have everything 
              you need.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">1. The Rolling Method</h2>
            <p>
              Rolling clothes instead of folding saves significant space and reduces wrinkles. Start 
              with heavier items at the bottom of your suitcase and build up with lighter pieces. 
              Use rubber bands or packing cubes to keep rolls tight.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">2. The 5-4-3-2-1 Rule</h2>
            <p>
              For a week-long trip: 5 sets of socks and underwear, 4 tops, 3 bottoms, 2 pairs of 
              shoes, and 1 hat/accessory. This formula ensures variety without overpacking. Choose 
              versatile pieces that mix and match.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">3. Essential Tech Packing</h2>
            <p>
              Never forget:
              <ul className="list-disc pl-6 mt-2">
                <li>Universal power adapter with USB ports</li>
                <li>Portable power bank (under 100Wh for flights)</li>
                <li>Extra charging cables in a separate pouch</li>
                <li>Noise-canceling headphones or earbuds</li>
                <li>Tablet or e-reader loaded with entertainment</li>
              </ul>
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">4. Toiletries Strategy</h2>
            <p>
              Use travel-sized containers and remember the 3-1-1 rule for carry-ons (3.4oz/100ml 
              containers in 1 quart-sized bag, 1 per passenger). Pack liquids in sealable bags to 
              prevent leaks. Consider solid alternatives (shampoo bars, toothpaste tablets).
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">5. The Personal Item Hack</h2>
            <p>
              Maximize your personal item (usually a backpack) with:
              <ul className="list-disc pl-6 mt-2">
                <li>Essential medications</li>
                <li>One change of clothes</li>
                <li>Travel documents and valuables</li>
                <li>Entertainment for the flight</li>
                <li>Snacks and empty water bottle</li>
              </ul>
              This ensures you're prepared if checked luggage is delayed.
            </p>
            
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">6. Space-Saving Accessories</h2>
            <p>
              Invest in:
              <ul className="list-disc pl-6 mt-2">
                <li>Compression packing cubes</li>
                <li>Foldable duffel bag for souvenirs</li>
                <li>Travel-sized wrinkle release spray</li>
                <li>Multi-purpose garments (like a scarf that doubles as a blanket)</li>
                <li>Collapsible water bottle</li>
              </ul>
            </p>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogPackingGuide;
