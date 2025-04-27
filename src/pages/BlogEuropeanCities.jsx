import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";

const BlogEuropeanCities = () => {
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
                src="https://images.unsplash.com/photo-1613236213658-ec84c1e85d1f"
                alt="European cities"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Top 10 European Cities to Visit in 2025
            </h1>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogEuropeanCities;
