import React from "react";

const Home = () => {
  const features = [
    {
      icon: "🌍",
      title: "Explore Destinations",
      description:
        "Discover top spots with curated travel guides and user tips.",
      image: "https://source.unsplash.com/400x300/?destination,travel",
    },
    {
      icon: "🧭",
      title: "Plan Seamlessly",
      description:
        "Smart itinerary planning with budget tracking and AI suggestions.",
      image: "https://source.unsplash.com/400x300/?map,travel",
    },
    {
      icon: "📊",
      title: "Dashboard Insights",
      description:
        "See your travel data, preferences, and past trips in one place.",
      image: "https://source.unsplash.com/400x300/?data,dashboard",
    },
  ];
  const testimonials = [
    {
      quote:
        "TravelPlanner completely changed how I organize my trips. It's a must-have!",
      name: "Emily R.",
      role: "Digital Nomad",
      image: "https://source.unsplash.com/100x100/?woman,portrait",
    },
    {
      quote:
        "The dashboard and guides are so intuitive. Saved me days of planning.",
      name: "Carlos M.",
      role: "Frequent Flyer",
      image: "https://source.unsplash.com/100x100/?man,smile",
    },
    {
      quote: "This platform helped me plan my honeymoon stress-free!",
      name: "Leila S.",
      role: "First-Time Traveler",
      image: "https://source.unsplash.com/100x100/?woman,smile",
    },
  ];
  const blogs = [
    {
      title: "Top 10 European Cities to Visit in 2025",
      snippet:
        "Looking for inspiration for your next trip? Check out our top picks for vibrant cities to explore...",
      image: "https://source.unsplash.com/400x300/?europe,city",
      link: "/blog/european-cities-2025",
    },
    {
      title: "Packing Like a Pro: Tips You Need",
      snippet:
        "From rolling clothes to power bank essentials—our ultimate packing guide saves space and time...",
      image: "https://source.unsplash.com/400x300/?packing,suitcase",
      link: "/blog/packing-guide",
    },
    {
      title: "How to Travel on a Budget Without Missing Out",
      snippet:
        "Budget travel doesn't mean cheap experiences. Learn how to maximize every cent...",
      image: "https://source.unsplash.com/400x300/?budget,backpacking",
      link: "/blog/budget-travel",
    },
  ];
  return (
    <main className="bg-[#0E0F2C] text-white min-h-screen pt-20">
      {/* Hero section */}
      <section className="flex flex-col items-center text-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover. Plan. Travel.{" "}
          <span className="text-blue-500">Effortlessly.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          TravelPlanner helps you create unforgettable journeys with smart tools
          and inspiring guides.
        </p>
        <a
          href="/dashboard"
          className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
        >
          Start Planning
        </a>
      </section>
    </main>
  );
};

export default Home;
