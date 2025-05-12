import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    // Also check system preference if no saved theme
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  // Apply theme class to document element and additional styles
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(theme);
    localStorage.setItem('theme', theme);

    // Apply additional theme-specific styles
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#111827'; // bg-gray-900
      document.body.style.color = '#f3f4f6'; // text-gray-100
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#111827'; // text-gray-900
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Get theme styles for easy consumption
  const themeStyles = {
    bg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    text: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50',
    buttonPrimary: theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600',
    buttonSecondary: theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300',
    secondaryText: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    gradientFrom: theme === 'dark' ? 'from-gray-800' : 'from-gray-100',
    gradientTo: theme === 'dark' ? 'to-gray-900' : 'to-gray-200'
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};