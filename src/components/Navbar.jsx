import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { 
  Menu, 
  X, 
  Plus, 
  Globe, 
  User, 
  LogIn, 
  LogOut, 
  Sun, 
  Moon,
  Home,
  MapPin,
  Settings,
  UserPlus
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useThemeStyles } from "../hooks/useThemeStyles";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const themeStyles = useThemeStyles();

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
      className={`fixed top-0 w-full z-50  ${
        isScrolled 
          ? `${themeStyles.navBg} shadow-md backdrop-blur-sm` 
          : `${theme === 'dark' ? 'bg-[#0E0F2C]/95' : 'bg-white/95'} backdrop-blur-sm`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink 
              to="/" 
              className={`flex items-center text-xl font-bold ${themeStyles.text} hover:text-blue-400 transition-colors`}
            >
              <Home className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-blue-400">Travel</span>Planner
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <NavLink
                  to="/createtrip"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium transition-all rounded-lg ${
                      isActive
                        ? "text-blue-400 bg-blue-400/10"
                        : `${themeStyles.secondaryText} hover:${themeStyles.text} hover:bg-opacity-50 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`
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
                        : `${themeStyles.secondaryText} hover:${themeStyles.text} hover:bg-opacity-50 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`
                    }`
                  }
                >
                  <Globe className="h-4 w-4 mr-2" />
                  My Trips
                </NavLink>
                <NavLink
                  to="/destinations"
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium transition-all rounded-lg ${
                      isActive
                        ? "text-blue-400 bg-blue-400/10"
                        : `${themeStyles.secondaryText} hover:${themeStyles.text} hover:bg-opacity-50 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`
                    }`
                  }
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Destinations
                </NavLink>
              </>
            )}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeStyles.secondaryText} hover:${themeStyles.text} hover:bg-opacity-50 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <div className="flex space-x-2 ml-2">
              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className={`flex items-center px-3 py-2 text-sm font-medium ${themeStyles.secondaryText} hover:${themeStyles.text} hover:bg-opacity-50 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} rounded-lg transition-colors`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user.user_metadata?.first_name || user.email}
                  </NavLink>
                  <button
                    onClick={handleSignOut}
                    className={`flex items-center px-4 py-2 text-sm font-medium ${themeStyles.text} border ${themeStyles.border} rounded-lg hover:bg-opacity-50 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className={`flex items-center px-4 py-2 text-sm font-medium ${themeStyles.text} border ${themeStyles.border} rounded-lg hover:bg-opacity-50 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Button (Mobile) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${themeStyles.secondaryText} hover:${themeStyles.text} hover:bg-opacity-50 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${themeStyles.secondaryText} hover:${themeStyles.text} hover:bg-opacity-50 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} focus:outline-none transition-colors`}
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
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} ${themeStyles.navBg} shadow-xl backdrop-blur-sm`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${themeStyles.secondaryText} hover:${themeStyles.text} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            <Home className="h-5 w-5 mr-3" />
            Home
          </NavLink>
          
          {user && (
            <>
              <NavLink
                to="/createtrip"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-blue-400/10 text-blue-400"
                      : `${themeStyles.secondaryText} hover:${themeStyles.text} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`
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
                      : `${themeStyles.secondaryText} hover:${themeStyles.text} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`
                  }`
                }
              >
                <Globe className="h-5 w-5 mr-3" />
                My Trips
              </NavLink>
              <NavLink
                to="/destinations"
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-blue-400/10 text-blue-400"
                      : `${themeStyles.secondaryText} hover:${themeStyles.text} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`
                  }`
                }
              >
                <MapPin className="h-5 w-5 mr-3" />
                Destinations
              </NavLink>
              <NavLink
                to="/profile"
                onClick={toggleMenu}
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${themeStyles.secondaryText} hover:${themeStyles.text} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </NavLink>
              <NavLink
                to="/settings"
                onClick={toggleMenu}
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${themeStyles.secondaryText} hover:${themeStyles.text} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </NavLink>
            </>
          )}
          
          <div className={`pt-2 border-t ${themeStyles.border}`}>
            {user ? (
              <button
                onClick={() => {
                  toggleMenu();
                  handleSignOut();
                }}
                className={`w-full flex items-center px-3 py-3 rounded-md text-base font-medium ${themeStyles.secondaryText} hover:${themeStyles.text} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            ) : (
              <>
                <NavLink
                  to="/signin"
                  onClick={toggleMenu}
                  className={`flex items-center justify-center px-3 py-3 rounded-md text-base font-medium ${themeStyles.secondaryText} hover:${themeStyles.text} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                >
                  <LogIn className="h-5 w-5 mr-3" />
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={toggleMenu}
                  className="flex items-center justify-center px-3 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="h-5 w-5 mr-3" />
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