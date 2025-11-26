import React from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Import Menu Icon

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="flex items-center text-white justify-between h-16 bg-teal-600 px-5 shadow-md">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button - Visible only on Mobile */}
        <button className="md:hidden text-2xl" onClick={toggleSidebar}>
            <FaBars />
        </button>
        <p className="text-center font-semibold">Welcome {user && user.name}</p>
      </div>
      <button 
        type="button" 
        className="px-4 py-1 bg-teal-700 hover:bg-teal-800 rounded transition-colors" 
        onClick={handleLogout}
      > 
        Logout
      </button>
    </div>
  );
};

export default Navbar;