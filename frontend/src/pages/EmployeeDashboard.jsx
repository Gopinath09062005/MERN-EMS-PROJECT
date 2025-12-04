import React, { useState } from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/dashboard/Navbar'

const EmployeeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* Sidebar (z-50) */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      
      <div className={`flex-1 flex flex-col h-screen transition-all duration-300 ${isSidebarOpen ? '' : ''} md:ml-64`}>
        
        {/* Navbar should be below the Sidebar (z-30) */}
        <div className="sticky top-0 z-30 bg-teal-600 shadow-md">
           <Navbar toggleSidebar={toggleSidebar} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 w-full max-w-[100vw]">
           <Outlet />
        </div>
      </div>

      {/* Overlay should be behind the Sidebar (z-40) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default EmployeeDashboard