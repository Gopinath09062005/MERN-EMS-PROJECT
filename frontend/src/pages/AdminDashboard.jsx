import React, { useState } from "react";
import { useAuth } from '../context/authContext'
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
        // H-screen ensures the app takes full height and doesn't scroll the body
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            
            {/* Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            
            {/* Main Content Area */}
            {/* flex-col ensures Navbar is on top, content below */}
            <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isSidebarOpen ? '' : ''} md:ml-64`}>
                
                {/* Navbar - இது தனியாக மேலே இருக்கும், Scroll ஆகாது */}
                <div className="flex-shrink-0 z-10 sticky top-0">
                    <Navbar toggleSidebar={toggleSidebar} />
                </div>

                {/* Content Wrapper - இது மட்டும் Scroll ஆகும் */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 scroll-smooth">
                    <Outlet />
                </div>
            </div>
            
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default AdminDashboard;