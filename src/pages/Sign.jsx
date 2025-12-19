import React from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");   // or user info
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
