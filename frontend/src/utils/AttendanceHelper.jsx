import axios from "axios";
import React from "react";
import { API_URL } from "./config"; // Import Config

export const columns = [
  { name: "S NO", selector: (row) => row.sno, width: "70px" },
  { name: "Name", selector: (row) => row.name, sortable: true, width: "100px" },
  { name: "Emp ID", selector: (row) => row.employeeId, sortable: true, width: "100px" },
  { name: "Department", selector: (row) => row.department, width: "120px" },
  { name: "Action", selector: (row) => row.action, center: "true" },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
    // Change: Using API_URL
    const response = await axios.put(`${API_URL}/attendance/update/${employeeId}`, {status}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    if(response.data.success) {
      statusChange()
    }
  }
  return (
    <div>
      {status == null ? (
        <div className="flex space-x-8">
          <button className="px-4 py-2 bg-green-500 text-white" onClick={() => markEmployee("Present", employeeId)}>Present</button>
          <button className="px-4 py-2 bg-red-500 text-white" onClick={() => markEmployee("Absent", employeeId)}>Absent</button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
      )}
    </div>
  );
};