import axios from "axios";
import React from "react";
import { API_URL } from "./config";

export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
    width: "70px", // S.No சிறியதாக இருந்தாலே போதும் (Fixed)
    center: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    // 👇 மாற்றம் இங்கே: width எடுத்துவிட்டு grow பயன்படுத்தவும் 👇
    grow: 1, // பெயருக்கு அதிக இடம் (Double space)
    center: true,
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    grow: 1, // மீதமுள்ள இடத்தைச் சமமாகப் பிரித்துக்கொள்ளும்
    center: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    grow: 0, // மீதமுள்ள இடத்தைச் சமமாகப் பிரித்துக்கொள்ளும்
    center: true,
  },
  {
    name: "Action / Status",
    selector: (row) => row.action,
    center: true,
    grow: 1, // மீதமுள்ள இடத்தைச் சமமாகப் பிரித்துக்கொள்ளும்
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
        statusChange(); 
      }
    } catch (error) {
      alert("Error updating attendance");
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      {!status ? (
        <div className="flex gap-3">
          <button
            className="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition shadow-sm font-medium text-sm"
            onClick={() => markEmployee("Present", employeeId)}
          >
            Present
          </button>
          <button
            className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-sm font-medium text-sm"
            onClick={() => markEmployee("Absent", employeeId)}
          >
            Absent
          </button>
        </div>
      ) : (
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