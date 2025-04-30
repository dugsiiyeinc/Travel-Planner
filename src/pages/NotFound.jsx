import React from "react";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useThemeStyles } from "../hooks/useThemeStyles";

const NotFound = () => {
  const navigate = useNavigate();
  const themeStyles = useThemeStyles();

  return (
    <div className={`${themeStyles.bg} ${themeStyles.text} min-h-screen flex flex-col items-center justify-center p-4`}>
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-500/10 p-4 rounded-full">
            <AlertTriangle className="h-10 w-10 text-yellow-400" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className={`${themeStyles.secondaryText} mb-8`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className={`${themeStyles.cardBg} rounded-2xl shadow-xl p-6 border ${themeStyles.border}`}>
          <button
            onClick={() => navigate(-1)}
            className={`w-full ${themeStyles.buttonPrimary} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors mb-4`}
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className={`w-full ${themeStyles.buttonSecondary} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors`}
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;