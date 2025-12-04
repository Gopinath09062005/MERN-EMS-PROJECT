import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaBuilding, 
  FaCalendarAlt, 
  FaCogs, 
  FaMoneyBillWave, 
  FaRegCalendarAlt, 
  FaTachometerAlt, 
  FaUsers, 
  FaTimes 
} from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import logoImg from "../../assets/original logo.jpg"; // Logo import

const AdminSidebar = ({ isOpen, closeSidebar }) => {
  return (
    <div
      className={`bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 z-50 transition-transform duration-300 transform 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      
      {/* Sidebar Header with Logo and Close Button */}
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
                EMS Admin
            </h3>
        </div>

        {/* Close Button */}
        <button className="md:hidden text-white text-xl hover:text-gray-200" onClick={closeSidebar}>
            <FaTimes />
        </button>
      </div>
      {/* End Sidebar Header */}

      <div className="px-3 space-y-2 mt-4">
        <NavLink to="/admin-dashboard" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`} end onClick={closeSidebar}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin-dashboard/employees" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`} onClick={closeSidebar}>
          <FaUsers />
          <span>Employee</span>
        </NavLink>
        <NavLink to="/admin-dashboard/departments" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`} onClick={closeSidebar}>
          <FaBuilding />
          <span>Department</span>
        </NavLink>
        <NavLink to="/admin-dashboard/leaves" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`} onClick={closeSidebar}>
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>
        <NavLink to="/admin-dashboard/salary/add" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`} onClick={closeSidebar}>
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink to="/admin-dashboard/attendance" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`} onClick={closeSidebar}>
          <FaRegCalendarAlt />
          <span>Attendance</span>
        </NavLink>
        <NavLink to="/admin-dashboard/attendance-report" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`} onClick={closeSidebar}>
          <AiOutlineFileText />
          <span>Attendance Report</span>
        </NavLink>
        <NavLink to="/admin-dashboard/setting" className={({ isActive }) => `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded transition-colors hover:bg-teal-600`} onClick={closeSidebar}>
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;