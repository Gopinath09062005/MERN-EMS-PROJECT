import React from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="flex items-center justify-between h-20 bg-teal-600 px-6 shadow-lg text-white relative">
      
      <div className="flex items-center">
        <button className="md:hidden text-2xl hover:text-teal-200 transition" onClick={toggleSidebar}>
            <FaBars />
        </button>
        <div className="hidden md:block w-10"></div> 
      </div>

      <div className="fixed left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-10">
        <span className="text-xs md:text-sm font-medium text-teal-100 uppercase tracking-widest">
            Welcome Back
        </span>
        <h1 className="text-xl md:text-3xl font-bold font-pacific tracking-wide drop-shadow-md">
            {user && user.name}
        </h1>
      </div>

      <div className="flex items-center">
        <button 
            className="flex items-center gap-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 rounded-full transition-all shadow-sm border border-teal-500" 
            onClick={handleLogout}
        > 
            <span className="hidden md:block font-semibold text-sm">Logout</span>
            <FaSignOutAlt className="text-sm" />
        </button>
      </div>

    </div>
  );
};

export default Navbar;