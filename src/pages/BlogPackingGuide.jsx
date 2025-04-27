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
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogPackingGuide;
