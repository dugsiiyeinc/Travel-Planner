import React from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { useThemeStyles } from "../hooks/useThemeStyles";

const Home = () => {
  const themeStyles = useThemeStyles();

  const features = [
    {
      icon: "🌍",
      title: "Explore Destinations",
      description:
        "Discover top spots with curated travel guides and user tips.",
      image:
        "https://images.unsplash.com/photo-1501425359013-96058e410cfc?q=80&w=2078&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: "🧭",
      title: "Plan Seamlessly",
      description:
        "Smart itinerary planning with budget tracking and AI suggestions.",
      image:
        "https://images.unsplash.com/photo-1617046774731-b2c14cc8c377?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      icon: "📊",
      title: "Dashboard Insights",
      description:
        "See your travel data, preferences, and past trips in one place.",
      image:
        "https://images.unsplash.com/photo-1639060015191-9d83063eab2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const testimonials = [
    {
      quote:
        "TravelPlanner completely changed how I organize my trips. It's a must-have!",
      name: "Haawa",
      role: "Digital Nomad",
      image:
        "https://images.unsplash.com/photo-1729658394538-9421c0dc5aa0?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The dashboard and guides are so intuitive. Saved me days of planning.",
      name: "Shiine",
      role: "Frequent Flyer",
      image:
        "https://images.unsplash.com/photo-1615204937608-614bc888e88f?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "This platform helped me plan my honeymoon stress-free!",
      name: "Ayaanle",
      role: "First-Time Traveler",
      image:
        "https://images.unsplash.com/photo-1698349247927-1f3d0b75365d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const blogs = [
    {
      title: "Top 10 European Cities to Visit in 2025",
      snippet:
        "Looking for inspiration for your next trip? Check out our top picks for vibrant cities to explore...",
      image:
        "https://images.unsplash.com/photo-1613236213658-ec84c1e85d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/blog/european-cities-2025",
    },
    {
      title: "Packing Like a Pro: Tips You Need",
      snippet:
        "From rolling clothes to power bank essentials—our ultimate packing guide saves space and time...",
      image:
        "https://images.unsplash.com/photo-1643779375222-81cbf9c15c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/blog/packing-guide",
    },
    {
      title: "How to Travel on a Budget Without Missing Out",
      snippet:
        "Budget travel doesn't mean cheap experiences. Learn how to maximize every cent...",
      image:
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/blog/budget-travel",
    },
  ];

  return (
    <div className={`${themeStyles.bg} ${themeStyles.text} min-h-screen`}>
      <Navbar />

      <main className="pt-20">
        {/* Hero section */}
        <section
          className={`flex flex-col items-center text-center px-4 py-20 bg-gradient-to-b ${themeStyles.gradientFrom} ${themeStyles.gradientTo} `}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            Discover. Plan. Travel.{" "}
            <span className="text-blue-400 bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Effortlessly.
            </span>
          </h1>
          <p
            className={`text-lg md:text-xl ${themeStyles.secondaryText} max-w-2xl mb-8`}
          >
            TravelPlanner helps you create unforgettable journeys with smart
            tools and inspiring guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink
              to="/createtrip"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              Start Planning
            </NavLink>
            <NavLink
              to="/mytrip"
              className={`bg-transparent border ${themeStyles.border} hover:bg-gray-700/50 ${themeStyles.text} font-semibold px-6 py-3 rounded-xl shadow-md transition-colors`}
            >
              View My Trips
            </NavLink>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-16 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-blue-400">TravelPlanner</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${themeStyles.cardBg} rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className={themeStyles.secondaryText}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className={`py-20 px-4 sm:px-6 lg:px-8 ${themeStyles.cardBg}`}>
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-3xl sm:text-4xl font-bold text-center mb-14 ${themeStyles.text}`}
            >
              What Our <span className="text-blue-500">Travelers</span> Say
            </h2>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 transition-shadow duration-300 shadow-md hover:shadow-xl border ${themeStyles.border} ${themeStyles.cardBg}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-400"
                    />
                    <div>
                      <h4
                        className={`font-semibold text-lg ${themeStyles.text}`}
                      >
                        {t.name}
                      </h4>
                      <p className={`text-sm ${themeStyles.secondaryText}`}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`italic text-sm leading-relaxed ${themeStyles.secondaryText}`}
                  >
                    “{t.quote}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Preview */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Latest <span className="text-blue-400">Blog Posts</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className={`${themeStyles.cardBg} p-6 rounded-xl shadow-md hover:shadow-xs transition-shadow`}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover mb-6 rounded-xl"
                />
                <h3 className="text-xl font-semibold mb-4">{blog.title}</h3>
                <p className={useThemeStyles.secondaryText} mb-4>
                  {blog.snippet}
                </p>
                <NavLink
                  to={blog.link}
                  className="text-blue-400 hover:text-blue-500 font-semibold"
                >
                  Read more
                </NavLink>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
