import React from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BlogBudgetTravel = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
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
        </div>
      </main>
    </div>
  );
};

export default BlogBudgetTravel;
