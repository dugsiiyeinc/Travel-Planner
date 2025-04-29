import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Plus, Globe, User, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ProfilePopup from "../pages/ProfilePopup";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-[#0E0F2C]/95 backdrop-blur-sm"
      } text-gray-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink 
              to="/" 
              className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              <span className="text-blue-400">Travel</span>Planner
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <NavLink
                  to="/createtrip"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium transition-all rounded-lg ${
                      isActive
                        ? "text-blue-400 bg-blue-400/10"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Trip
                </NavLink>
                <NavLink
                  to="/mytrip"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium transition-all rounded-lg ${
                      isActive
                        ? "text-blue-400 bg-blue-400/10"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                    }`
                  }
                >
                  <Globe className="h-4 w-4 mr-2" />
                  My Trips
                </NavLink>
              </>
            )}
            
            <div className="flex space-x-2 ml-4">
              {user ? (
                <>
                  <button
                    onClick={() => setShowProfilePopup(true)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.user_metadata?.first_name || user.email}
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-transparent border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-800/95 backdrop-blur-sm shadow-xl`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {user && (
            <>
              <NavLink
                to="/createtrip"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-blue-400/10 text-blue-400"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <Plus className="h-5 w-5 mr-3" />
                Create Trip
              </NavLink>
              <NavLink
                to="/mytrip"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-blue-400/10 text-blue-400"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <Globe className="h-5 w-5 mr-3" />
                My Trips
              </NavLink>
            </>
          )}
          
          <div className="pt-2 border-t border-gray-700">
            {user ? (
              <>
                <button
                  onClick={() => {
                    setShowProfilePopup(true);
                    toggleMenu();
                  }}
                  className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <User className="h-5 w-5 mr-3" />
                  {user.user_metadata?.first_name || user.email}
                </button>
                <button
                  onClick={() => {
                    toggleMenu();
                    handleSignOut();
                  }}
                  className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  onClick={toggleMenu}
                  className="flex items-center justify-center px-3 py-3 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LogIn className="h-5 w-5 mr-3" />
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={toggleMenu}
                  className="flex items-center justify-center px-3 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <ProfilePopup 
          onClose={() => setShowProfilePopup(false)}
          onUpdate={() => {
            setShowProfilePopup(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;