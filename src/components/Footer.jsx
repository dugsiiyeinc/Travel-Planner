import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Globe, Mail } from 'lucide-react';
import { useThemeStyles } from '../hooks/useThemeStyles';

const Footer = () => {
  const themeStyles = useThemeStyles();

  return (
    <footer className={`${themeStyles.cardBg} ${themeStyles.text} border-t ${themeStyles.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">
              <span className="text-blue-400">Travel</span>Planner
            </h2>
            <p className={themeStyles.secondaryText}>
              Crafting unforgettable travel experiences since 2023.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
              <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                <span className="sr-only">LinkedIn</span>
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                  Travel Guides
                </a>
              </li>
              <li>
                <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                  Special Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} transition-colors`}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className={themeStyles.secondaryText}>
              Subscribe to get travel tips and exclusive offers.
            </p>
            <form className="flex flex-col space-y-3 mt-4">
              <input
                type="email"
                placeholder="Your email"
                className={`px-4 py-2 rounded-md ${themeStyles.cardBg} ${themeStyles.border} focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeStyles.text}`}
              />
              <button
                type="submit"
                className={`px-4 py-2 ${themeStyles.buttonPrimary} text-white rounded-md transition-colors`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className={themeStyles.secondaryText}>
            &copy; {new Date().getFullYear()} TravelPlanner. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} text-sm flex items-center`}>
              <Globe size={16} className="mr-1" />
              English
            </a>
            <a href="#" className={`${themeStyles.secondaryText} hover:${themeStyles.text} text-sm flex items-center`}>
              <Mail size={16} className="mr-1" />
              help@travelplanner.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;