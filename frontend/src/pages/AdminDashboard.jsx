import React, { useState } from "react";
import { useAuth } from '../context/authContext';
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            
            {/* Sidebar (z-50) */}
            <AdminSidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            
            {/* Main Layout */}
            <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isSidebarOpen ? '' : ''} md:ml-64`}>
                
                {/* NAVBAR: z-30 (Should be below Sidebar) */}
                <div className="sticky top-0 z-30 bg-teal-600 shadow-md">
                    <Navbar toggleSidebar={toggleSidebar} />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 w-full max-w-[100vw]">
                    <Outlet />
                </div>
            </div>
            
            {/* OVERLAY: z-40 (Behind Sidebar, in front of Navbar) */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default AdminDashboard;