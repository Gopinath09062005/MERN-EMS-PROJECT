import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL, SERVER_URL } from "../../utils/config";
import { FaUser, FaIdBadge, FaCalendarAlt, FaVenusMars, FaBuilding, FaRing, FaMoneyBillWave } from "react-icons/fa";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/employee/${id}`, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>
      {employee ? (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
          <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
            
            {/* 1. Top Banner (Gradient Background) */}
            <div className="h-40 bg-gradient-to-r from-teal-500 to-emerald-600"></div>

            <div className="px-6 pb-8">
                {/* 2. Profile Image (Overlapping) */}
                <div className="relative flex justify-center -mt-20 mb-6">
                    <img
                        src={`${SERVER_URL}/uploads/${employee.userId.profileImage}`}
                        alt={employee.userId.name}
                        className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                </div>

                {/* 3. Name & Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">{employee.userId.name}</h2>
                    <p className="text-gray-500 font-medium mt-1">{employee.designation}</p>
                    <p className="text-teal-600 text-sm font-semibold bg-teal-50 px-3 py-1 rounded-full inline-block mt-2">
                        {employee.employeeId}
                    </p>
                </div>

                {/* 4. Details Grid with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                    
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition">
                            <div className="text-teal-600 text-xl mr-4"><FaUser /></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Full Name</p>
                                <p className="font-semibold">{employee.userId.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition">
                            <div className="text-teal-600 text-xl mr-4"><FaCalendarAlt /></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Date of Birth</p>
                                <p className="font-semibold">{new Date(employee.dob).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition">
                            <div className="text-teal-600 text-xl mr-4"><FaVenusMars /></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Gender</p>
                                <p className="font-semibold capitalize">{employee.gender}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition">
                            <div className="text-teal-600 text-xl mr-4"><FaBuilding /></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Department</p>
                                <p className="font-semibold">{employee.department.dep_name}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition">
                            <div className="text-teal-600 text-xl mr-4"><FaRing /></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Marital Status</p>
                                <p className="font-semibold capitalize">{employee.maritalStatus}</p>
                            </div>
                        </div>

                        <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition">
                            <div className="text-teal-600 text-xl mr-4"><FaMoneyBillWave /></div>
                            <div>
                                <p className="text-xs text-gray-400 uppercase font-bold">Current Salary</p>
                                <p className="font-semibold">₹{employee.salary}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-gray-500 font-semibold">
            Loading Employee Details...
        </div>
      )}
    </>
  );
};

export default View;