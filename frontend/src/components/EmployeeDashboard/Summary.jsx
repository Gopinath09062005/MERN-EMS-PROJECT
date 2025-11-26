import React from 'react';
import { FaUser, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Summary = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl shadow-xl p-8 mb-8 text-white flex items-center space-x-6 transform transition hover:scale-[1.01] duration-300">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                    <FaUser className="text-4xl md:text-5xl" />
                </div>
                <div>
                    <p className="text-lg opacity-90 font-medium">Welcome Back,</p>
                    <h3 className="text-3xl md:text-4xl font-bold">{user ? user.name : "Employee"}</h3>
                    <p className="text-sm mt-1 opacity-80">Have a productive day ahead!</p>
                </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Profile Card */}
                <div 
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-teal-500 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/employee-dashboard/profile/${user._id}`)}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-gray-700">My Profile</h4>
                        <div className="bg-teal-100 p-3 rounded-full text-teal-600">
                            <FaUser />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">View and update your personal information.</p>
                </div>

                {/* Leave Card */}
                <div 
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/employee-dashboard/leaves/${user._id}`)}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-gray-700">Leaves</h4>
                        <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
                            <FaCalendarAlt />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">Check leave balance and apply for new leave.</p>
                </div>

                {/* Salary Card */}
                <div 
                    className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/employee-dashboard/salary/${user._id}`)}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-bold text-gray-700">Salary</h4>
                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <FaMoneyBillWave />
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">View your salary history and payslips.</p>
                </div>

            </div>
        </div>
    );
};

export default Summary;