import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error(error.message || "Error creating account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0E0F2C] text-white min-h-screen">
      <Navbar />
      
      <main className="pt-20 pb-12 px-4 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <UserPlus className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">
            Join TravelPlanner to start organizing your trips
          </p>
        </div>
        
        <div className="bg-[#1B1C3D] rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Doe"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters
              </p>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-[#252747] border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-start">
              {/* <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                />
              </div> */}
              {/* <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-300">
                  I agree to the{" "}
                  <button type="button" className="text-blue-400 hover:underline">
                    Terms and Conditions
                  </button>
                </label>
              </div> */}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
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
