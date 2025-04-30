import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const BlogEuropeanCities = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-[#0E0F2C]' : 'bg-gray-50'} ${theme === 'dark' ? 'text-white' : 'text-gray-900'} min-h-screen`}>
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
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Europe continues to be a top destination for travelers worldwide.
              In 2025, these cities stand out for their unique blend of history,
              culture, and modern attractions.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              1. Lisbon, Portugal
            </h2>
            <p>
              Lisbon's charm lies in its colorful streets, historic trams, and
              stunning coastal views. Don't miss the Belém Tower and the vibrant
              LX Factory.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              2. Kraków, Poland
            </h2>
            <p>
              This well-preserved medieval city offers a rich history at every
              turn. The Wawel Castle and the historic Jewish Quarter are
              must-sees.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              3. Valencia, Spain
            </h2>
            <p>
              Valencia shines with its futuristic City of Arts and Sciences,
              beautiful beaches, and the birthplace of paella.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              4. Edinburgh, Scotland
            </h2>
            <p>
              Edinburgh's dramatic skyline, dominated by its castle, makes it
              one of Europe's most picturesque capitals.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              5. Tallinn, Estonia
            </h2>
            <p>
              Tallinn's perfectly preserved medieval Old Town feels like
              stepping into a fairy tale.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              6. Porto, Portugal
            </h2>
            <p>
              Famous for its port wine, Porto charms visitors with its colorful
              riverside district and historic bookstores.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              7. Ghent, Belgium
            </h2>
            <p>Ghent offers medieval beauty with fewer crowds than Bruges.</p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              8. Ljubljana, Slovenia
            </h2>
            <p>
              This green capital with its pedestrian-friendly center is one of
              Europe's hidden gems.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              9. Thessaloniki, Greece
            </h2>
            <p>
              Greece's second city offers vibrant nightlife, history, and
              affordable food.
            </p>
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-400">
              10. Bergen, Norway
            </h2>
            <p>
              Gateway to Norway's fjords, Bergen's colorful Bryggen wharf is
              UNESCO-listed.
            </p>
            <div className={`mt-12 p-6 ${theme === 'dark' ? 'bg-[#1B1C3D]' : 'bg-blue-50'} rounded-xl`}>
              <h3 className="text-xl font-semibold mb-4">
                Planning Your European Adventure
              </h3>
              <p>
                When visiting multiple European cities, consider rail passes
                like Eurail for flexible and affordable travel.
              </p>
              <p className="mt-4">
                Many cities offer tourist cards for public transport and museums
                — a great way to save money.
              </p>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogEuropeanCities;