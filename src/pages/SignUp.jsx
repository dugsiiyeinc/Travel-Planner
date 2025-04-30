import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { UserPlus, Eye, EyeOff, Mail, Lock, User, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { supabase } from "../services/supabses";
import { useThemeStyles } from "../hooks/useThemeStyles";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const themeStyles = useThemeStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, firstName, lastName);
      toast.success("Account created successfully! Please check your email for confirmation.");
      navigate("/signin");
    } catch (error) {
      console.error("SignUp Error:", error);
      
      if (error.message.includes('Database error querying schema')) {
        toast.error("Please try again or contact support if the problem persists");
      } else if (error.message.includes('Email rate limit exceeded')) {
        toast.error("Too many attempts. Please try again later.");
      } else if (error.message.includes('User already registered')) {
        toast.error("Email already in use. Please sign in instead.");
      } else {
        toast.error(error.message || "Error creating account");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${themeStyles.bg} ${themeStyles.text} min-h-screen`}>
      <Navbar />
      
      <main className="pt-20 pb-12 px-4 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className={`${themeStyles.buttonPrimary.replace('hover:bg-blue-700', '')}/10 p-3 rounded-full`}>
              <UserPlus className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className={themeStyles.secondaryText}>
            Join TravelPlanner to start organizing your trips
          </p>
        </div>
        
        <div className={`${themeStyles.cardBg} rounded-2xl shadow-xl p-6 md:p-8 border ${themeStyles.border}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className={`block text-sm font-medium ${themeStyles.secondaryText} mb-2`}>
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className={`h-5 w-5 ${themeStyles.secondaryText}`} />
                  </div>
                  <input
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className={`w-full ${themeStyles.cardBg} border ${themeStyles.border} rounded-lg pl-10 py-3 ${themeStyles.text} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                    placeholder="John"
                    autoComplete="given-name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="last-name" className={`block text-sm font-medium ${themeStyles.secondaryText} mb-2`}>
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User2 className={`h-5 w-5 ${themeStyles.secondaryText}`} />
                  </div>
                  <input
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className={`w-full ${themeStyles.cardBg} border ${themeStyles.border} rounded-lg pl-10 py-3 ${themeStyles.text} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                    placeholder="Doe"
                    autoComplete="family-name"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${themeStyles.secondaryText} mb-2`}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 ${themeStyles.secondaryText}`} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full ${themeStyles.cardBg} border ${themeStyles.border} rounded-lg pl-10 py-3 ${themeStyles.text} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${themeStyles.secondaryText} mb-2`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${themeStyles.secondaryText}`} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className={`w-full ${themeStyles.cardBg} border ${themeStyles.border} rounded-lg pl-10 py-3 pr-12 ${themeStyles.text} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${themeStyles.secondaryText} hover:${themeStyles.text}`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className={`mt-1 text-xs ${themeStyles.secondaryText}`}>
                Must be at least 8 characters
              </p>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className={`block text-sm font-medium ${themeStyles.secondaryText} mb-2`}>
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 ${themeStyles.secondaryText}`} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className={`w-full ${themeStyles.cardBg} border ${themeStyles.border} rounded-lg pl-10 py-3 pr-12 ${themeStyles.text} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${themeStyles.secondaryText} hover:${themeStyles.text}`}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${themeStyles.buttonPrimary} text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors disabled:opacity-70 flex justify-center items-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : "Create Account"}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className={`${themeStyles.secondaryText} text-sm`}>
              Already have an account?{" "}
              <button 
                onClick={() => navigate("/signin")} 
                className="text-blue-400 hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;