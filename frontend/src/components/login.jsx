import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaEye, FaEyeSlash, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const LoginPopup = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const togglePassword = () => setShowPassword(!showPassword);

  function handleClick(){
    navigate('/patient')  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    if (!email) errors.email = "Required";
    if (!password) errors.password = "Required";
    
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    
    setError({ email: "", password: "" });
    // alert("Login successful (dummy authentication)");
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center 
      bg-black bg-opacity-30 backdrop-blur-md transition-all duration-300"
      onClick={onClose} // Close when clicking outside
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close Button (Navigates to Home) */}
        <button 
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={() => navigate("/")} // Navigate to home
        >
          <FaTimes size={18} />
        </button>

        {showForgotPassword ? (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">Reset Your Password</h2>
            <p className="text-center text-sm mb-4">
              Enter your Med Matrix account email address, and we'll send you a security code.
            </p>
            <label className="block mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border rounded mb-3 border-gray-300"
              placeholder="Enter your email"
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded mb-3">
              Continue
            </button>
            <button 
              className="text-blue-500 text-sm block w-full text-center"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to sign-in
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center mb-4">MED MATRIX</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <label className="block mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 border rounded mb-1 ${error.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter your email"
              />
              {error.email && (
                <p className="text-red-500 text-sm font-semibold mb-3 flex items-center">
                  <FaExclamationCircle className="mr-1" /> {error.email}
                </p>
              )}
              
              {/* Password Input */}
              <label className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-2 border rounded mb-1 ${error.password ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-3"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error.password && (
                <p className="text-red-500 text-sm font-semibold mb-3 flex items-center">
                  <FaExclamationCircle className="mr-1" /> {error.password}
                </p>
              )}
              
              {/* Forgot Password & Submit */}
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-500 text-sm mb-3 block"
              >
                Forgot password?
              </button>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded mb-3 hover:bg-blue-700 transition"
                onClick={handleClick}
              >
                Sign in
              </button>
            </form>

            {/* Social Login */}
            <p className="text-center mb-3">or sign in with</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button className="p-2 bg-blue-500 text-white rounded w-full flex justify-center">
                <FaFacebook className="text-xl" />
              </button>
              <button className="p-2 bg-white border rounded w-full flex justify-center">
                <FcGoogle className="text-xl" />
              </button>
            </div>
          </div>
        )}
        <button className="text-red-500 text-sm block w-full text-center mt-3" onClick={() => navigate("/")}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
