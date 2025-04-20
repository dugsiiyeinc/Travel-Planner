import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-gray-300 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-white">
              <span className="text-blue-400">Travel</span>Planner
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/trips" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${
                  isActive 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500'
                }`
              }
            >
              Trips
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `px-3 py-2 text-sm font-medium ${
                  isActive 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-gray-400 hover:text-white hover:border-b-2 hover:border-gray-500'
                }`
              }
            >
              Profile
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
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
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 shadow-lg`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink 
            to="/" 
            onClick={toggleMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-700 text-blue-400' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard" 
            onClick={toggleMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-700 text-blue-400' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/trips" 
            onClick={toggleMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-700 text-blue-400' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            Trips
          </NavLink>
          <NavLink 
            to="/profile" 
            onClick={toggleMenu}
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive 
                  ? 'bg-gray-700 text-blue-400' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;