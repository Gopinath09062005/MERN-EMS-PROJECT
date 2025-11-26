import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../utils/config";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(`${API_URL}/dashboard/summary`, {
          headers : { "Authorization" : `Bearer ${localStorage.getItem('token')}` }
        })
        setSummary(summary.data)
      } catch(error) {
        if(error.response) {
          alert(error.response.data.error)
        }
        console.log(error.message);
      }
    }
    fetchSummary()
  },[])

  if(!summary) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800">Dashboard Overview</h3>
        <p className="text-gray-500 mt-1">Welcome back, here is a quick summary of your organization.</p>
      </div>

      {/* Key Metrics Grid - லிங்க் சேர்க்கப்பட்டுள்ளது */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SummaryCard 
            icon={<FaUsers />} 
            text="Total Employees" 
            number={summary.totalEmployees} 
            color="bg-teal-600" 
            link="/admin-dashboard/employees" // Link to Employees
        />
        <SummaryCard 
            icon={<FaBuilding />} 
            text="Total Departments" 
            number={summary.totalDepartments} 
            color="bg-yellow-600" 
            link="/admin-dashboard/departments" // Link to Departments
        />
        <SummaryCard 
            icon={<FaMoneyBillWave />} 
            text="Monthly Salary" 
            number={`₹${summary.totalSalary}`} 
            color="bg-red-600" 
            // Salary Page லிங்க் (தேவைப்பட்டால் மாற்றிக்கொள்ளலாம்)
            // link="/admin-dashboard/salary/add" 
        />
      </div>

      {/* Leave Details Section - எல்லோரும் Leave Page-க்கு போவார்கள் */}
      <div className="mt-12">
        <h4 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-teal-600 pl-3">Leave Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SummaryCard 
            icon={<FaFileAlt />} 
            text="Leave Applied" 
            number={summary.leaveSummary.appliedFor} 
            color="bg-teal-600" 
            link="/admin-dashboard/leaves"
          />
          <SummaryCard 
            icon={<FaCheckCircle />} 
            text="Leave Approved" 
            number={summary.leaveSummary.approved} 
            color="bg-green-600" 
            link="/admin-dashboard/leaves"
          />
          <SummaryCard 
            icon={<FaHourglassHalf />} 
            text="Leave Pending" 
            number={summary.leaveSummary.pending} 
            color="bg-yellow-600" 
            link="/admin-dashboard/leaves"
          />
          <SummaryCard 
            icon={<FaTimesCircle />} 
            text="Leave Rejected" 
            number={summary.leaveSummary.rejected} 
            color="bg-red-600" 
            link="/admin-dashboard/leaves"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;