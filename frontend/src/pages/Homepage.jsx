import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. NAVBAR - Glass Effect */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-extrabold text-teal-600 tracking-wide flex items-center gap-2">
           {/* Logo Icon */}
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
           EMS
        </div>
        <button 
          onClick={handleLogin}
          className="px-6 py-2 border border-teal-600 text-teal-600 font-semibold rounded-full hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Login
        </button>
      </nav>

      {/* 2. HERO SECTION - The "Wow" Factor */}
      <div className="relative pt-32 pb-20 px-6 bg-gradient-to-r from-teal-600 to-emerald-800 text-white overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full mix-blend-overlay blur-3xl -translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 opacity-10 rounded-full mix-blend-overlay blur-3xl translate-x-20 translate-y-20"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Manage Your Workforce <br />
              <span className="text-yellow-400">Efficiently</span>
            </h1>
            <p className="text-lg md:text-xl text-teal-100 max-w-lg mx-auto md:mx-0">
              Streamline payroll, attendance, and employee management with our all-in-one cloud solution.
            </p>
            <button 
              onClick={handleLogin}
              className="mt-8 px-8 py-3 bg-yellow-400 text-teal-900 font-bold text-lg rounded-lg shadow-lg hover:bg-yellow-300 transition transform hover:scale-105"
            >
              Get Started Now
            </button>
          </div>
          
          {/* Hero Image / Illustration */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
             <img 
               src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg" 
               alt="Team Management" 
               className="w-full max-w-md rounded-lg shadow-2xl border-4 border-white/20"
             />
          </div>
        </div>
      </div>

      {/* 3. FEATURES SECTION - Interactive Cards */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose EMS?</h2>
          <p className="text-gray-500 mt-2">Everything you need to manage your company in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1: Employee Management */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-teal-500">
            <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6 text-2xl">
              👥
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Employee Mgmt</h3>
            <p className="text-gray-600 text-sm">Easily add, edit, and manage employee records with secure role-based access control.</p>
          </div>

          {/* Card 2: Department */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
             <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 text-2xl">
              🏢
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Departments</h3>
            <p className="text-gray-600 text-sm">Organize your workforce into departments and designate roles for better structure.</p>
          </div>

          {/* Card 3: Payroll */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-yellow-500">
             <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-6 text-2xl">
              💰
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Payroll System</h3>
            <p className="text-gray-600 text-sm">Automate salary calculations including allowances and deductions seamlessly.</p>
          </div>

          {/* Card 4: Leave Management */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-red-500">
             <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 text-2xl">
              📅
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Leave Tracking</h3>
            <p className="text-gray-600 text-sm">Employees can apply for leave online, and admins can approve or reject with a click.</p>
          </div>

        </div>
      </div>

      {/* 4. FOOTER */}
      <footer className="bg-gray-900 text-white py-8 text-center">
         <p className="text-gray-400 text-sm">&copy; 2025 Employee Management System. All rights reserved.</p>
         <p className="text-gray-600 text-xs mt-2">Built with using MERN Stack</p>
      </footer>
    </div>
  );
};

export default Home;