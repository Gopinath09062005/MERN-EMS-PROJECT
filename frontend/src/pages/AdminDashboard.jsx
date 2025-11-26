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
        <div className="flex h-screen bg-gray-100">
            
            {/* Sidebar */}
            <AdminSidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            
            {/* Main Content */}
            {/* flex-1 மற்றும் h-screen கொடுத்தால் போதும். overflow-hidden தேவையில்லை */}
            <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isSidebarOpen ? '' : ''} md:ml-64`}>
                
                <div className="flex-shrink-0 z-10 sticky top-0">
                    <Navbar toggleSidebar={toggleSidebar} />
                </div>

                {/* 👇 மாற்றம் இங்கே: w-full மற்றும் overflow-x-hidden சேர்க்கப்பட்டுள்ளது 👇 */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-gray-50 w-full">
                    <Outlet />
                </div>
            </div>
            
            {/* Overlay */}
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