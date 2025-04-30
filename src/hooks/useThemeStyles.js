// src/hooks/useThemeStyles.js
import { useTheme } from "../context/ThemeContext";

export const useThemeStyles = () => {
  const { theme } = useTheme();

  const themeStyles = {
    dark: {
      bg: "bg-[#0E0F2C]",
      cardBg: "bg-[#1B1C3D]",
      text: "text-white",
      secondaryText: "text-gray-300",
      border: "border-gray-700",
      buttonPrimary: "bg-blue-600 hover:bg-blue-700",
      buttonSecondary: "bg-gray-700 hover:bg-gray-600",
      navBg: "bg-gray-900/95",
      gradientFrom: "from-[#0E0F2C]",
      gradientTo: "to-[#151635]",
    },
    light: {
      bg: "bg-gray-50",
      cardBg: "bg-white",
      text: "text-gray-900",
      secondaryText: "text-gray-600",
      border: "border-gray-200",
      buttonPrimary: "bg-blue-500 hover:bg-blue-600",
      buttonSecondary: "bg-gray-200 hover:bg-gray-300",
      navBg: "bg-white/95",
      gradientFrom: "from-gray-50",
      gradientTo: "to-gray-100",
    }
  };

  return themeStyles[theme];
};