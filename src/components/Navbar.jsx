// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Plus, Globe, User, LogIn, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

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
        isScrolled ? theme === 'dark' ? "bg-gray-900/95" : "bg-white/95" : 
        theme === 'dark' ? "bg-[#0E0F2C]/95" : "bg-white/95"
      } backdrop-blur-sm shadow-lg text-${theme === 'dark' ? 'gray-300' : 'gray-700'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink 
              to="/" 
              className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} hover:text-blue-400 transition-colors`}
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
                        : theme === 'dark' ? "text-gray-400 hover:text-white hover:bg-gray-700/50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
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
                        : theme === 'dark' ? "text-gray-400 hover:text-white hover:bg-gray-700/50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                    }`
                  }
                >
                  <Globe className="h-4 w-4 mr-2" />
                  My Trips
                </NavLink>
              </>
            )}
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'text-yellow-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-200/50'}`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="flex space-x-2 ml-4">
              {user ? (
                <>
                  <NavLink
                    to="/mytrip"
                    className={`flex items-center px-3 py-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200/50'} rounded-lg transition-colors`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.user_metadata?.first_name || user.email}
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className={`flex items-center px-4 py-2 text-sm font-medium text-white ${theme === 'dark' ? 'bg-transparent border border-gray-600 hover:bg-gray-700/50' : 'bg-transparent border border-gray-300 hover:bg-gray-200/50 text-gray-700'} rounded-lg transition-colors`}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className={`flex items-center px-4 py-2 text-sm font-medium ${theme === 'dark' ? 'bg-transparent border border-gray-600 hover:bg-gray-700/50 text-white' : 'bg-transparent border border-gray-300 hover:bg-gray-200/50 text-gray-700'} rounded-lg transition-colors`}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
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
              onClick={toggleTheme}
              className={`p-2 mr-2 rounded-full ${theme === 'dark' ? 'text-yellow-300 hover:bg-gray-700/50' : 'text-gray-700 hover:bg-gray-200/50'}`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'} focus:outline-none transition-colors`}
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
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} ${theme === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm shadow-xl`}>
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
                      : theme === 'dark' ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
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
                      : theme === 'dark' ? "text-gray-300 hover:bg-gray-700 hover:text-white" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                  }`
                }
              >
                <Globe className="h-5 w-5 mr-3" />
                My Trips
              </NavLink>
            </>
          )}
          
          <div className={`pt-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            {user ? (
              <>
                <NavLink
                  to="/mytrip"
                  onClick={toggleMenu}
                  className={`w-full flex items-center px-3 py-3 rounded-md text-base font-medium ${
                    theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  {user.user_metadata?.first_name || user.email}
                </NavLink>
                <button
                  onClick={() => {
                    toggleMenu();
                    handleSignOut();
                  }}
                  className={`w-full flex items-center px-3 py-3 rounded-md text-base font-medium ${
                    theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
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
                  className={`flex items-center justify-center px-3 py-3 rounded-md text-base font-medium ${
                    theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
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
    </nav>
  );
};

export default Navbar;