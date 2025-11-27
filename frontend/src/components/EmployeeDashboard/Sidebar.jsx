import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaCalendarAlt, FaCogs, FaTachometerAlt, FaUsers, FaTimes } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import logoImg from "../../assets/original logo.jpg"; // லோகோ இம்போர்ட்

const Sidebar = ({ isOpen, closeSidebar }) => {
    const {user} = useAuth()

  return (
    <div
      className={`bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 z-50 transition-transform duration-300 transform
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      
      {/* 👇 மாற்றம் இங்கே: லோகோ சேர்க்கப்பட்டுள்ளது 👇 */}
      <div className="bg-teal-600 h-20 flex items-center justify-between px-4 shadow-md">
        
        {/* Logo & Text */}
        <div className="flex items-center gap-3">
            {/* Round Logo */}
            <img 
                src={logoImg} 
                alt="EMS Logo" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <h3 className="text-xl font-pacific font-bold tracking-wide">
                EMS
            </h3>
        </div>

        {/* Close Button */}
        <button className="md:hidden text-white text-xl hover:text-gray-200" onClick={closeSidebar}>
            <FaTimes />
        </button>
      </div>
      {/* 👆 மாற்றம் முடிந்தது 👆 */}

      <div className="px-3 space-y-2 mt-4">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " " } flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`
          }
          end
          onClick={closeSidebar}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " " } flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`
          }
          onClick={closeSidebar}
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " " } flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`
          }
          onClick={closeSidebar}
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>
        
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " " } flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`
          }
          onClick={closeSidebar}
        >
          <FaCalendarAlt />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " " } flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`
          }
          onClick={closeSidebar}
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;