import axios from "axios";
import React from "react";
import { API_URL } from "./config";

export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
    width: "80px",
    center: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "200px",
    center: true,
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "150px",
    center: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "150px",
    center: true,
  },
  {
    name: "Action / Status", // தலைப்பை மாற்றியுள்ளேன்
    selector: (row) => row.action,
    center: true,
    width: "250px", 
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  
  const markEmployee = async (newStatus, employeeId) => {
    try {
      const response = await axios.put(
        `${API_URL}/attendance/update/${employeeId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        // மார்க் செய்தவுடன் லிஸ்டை புதுப்பிக்க (Refresh) இது உதவும்
        statusChange(); 
      }
    } catch (error) {
      alert("Error updating attendance");
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      {/* 1. status === null (இன்னும் மார்க் செய்யப்படவில்லை)
            -> இரண்டு பட்டன்களையும் காட்டு (Present / Absent)
         
         2. status !== null (ஏற்கனவே மார்க் செய்யப்பட்டுவிட்டது)
            -> அந்த ஸ்டேட்டஸை கலராக காட்டு.
      */}
      
      {!status ? (
        <div className="flex gap-3">
          <button
            className="px-4 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition shadow-sm font-medium text-sm"
            onClick={() => markEmployee("Present", employeeId)}
          >
            Present
          </button>
          <button
            className="px-4 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-sm font-medium text-sm"
            onClick={() => markEmployee("Absent", employeeId)}
          >
            Absent
          </button>
        </div>
      ) : (
        // ஏற்கனவே மார்க் செய்யப்பட்டிருந்தால் இதை காட்டு
        <div className={`px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wide shadow-sm border
            ${status === "Present" 
                ? "bg-green-100 text-green-700 border-green-200" 
                : "bg-red-100 text-red-700 border-red-200"}`}
        >
            {status}
        </div>
      )}
    </div>
  );
};