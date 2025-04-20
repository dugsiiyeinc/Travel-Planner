import React from 'react'

const Home = () => {
  const features = [
    {
      icon: "🌍",
      title: "Explore Destinations",
      description: "Discover top spots with curated travel guides and user tips.",
      image: "https://source.unsplash.com/400x300/?destination,travel",
    },
    {
      icon: "🧭",
      title: "Plan Seamlessly",
      description: "Smart itinerary planning with budget tracking and AI suggestions.",
      image: "https://source.unsplash.com/400x300/?map,travel",
    },
    {
      icon: "📊",
      title: "Dashboard Insights",
      description: "See your travel data, preferences, and past trips in one place.",
      image: "https://source.unsplash.com/400x300/?data,dashboard",
    },
  ];
  const testimonials = [
    {
      quote: "TravelPlanner completely changed how I organize my trips. It's a must-have!",
      name: "Emily R.",
      role: "Digital Nomad",
      image: "https://source.unsplash.com/100x100/?woman,portrait",
    },
    {
      quote: "The dashboard and guides are so intuitive. Saved me days of planning.",
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
      snippet: "Looking for inspiration for your next trip? Check out our top picks for vibrant cities to explore...",
      image: "https://source.unsplash.com/400x300/?europe,city",
      link: "/blog/european-cities-2025",
    },
    {
      title: "Packing Like a Pro: Tips You Need",
      snippet: "From rolling clothes to power bank essentials—our ultimate packing guide saves space and time...",
      image: "https://source.unsplash.com/400x300/?packing,suitcase",
      link: "/blog/packing-guide",
    },
    {
      title: "How to Travel on a Budget Without Missing Out",
      snippet: "Budget travel doesn't mean cheap experiences. Learn how to maximize every cent...",
      image: "https://source.unsplash.com/400x300/?budget,backpacking",
      link: "/blog/budget-travel",
    },
  ];
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default Home
