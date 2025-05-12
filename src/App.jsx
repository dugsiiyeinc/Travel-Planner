import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

const App = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer>
        <Footer />
      </footer>
      
      {/* Toast positioned fixed at bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <Toast />
      </div>
    </div>
  );
};

export default App;