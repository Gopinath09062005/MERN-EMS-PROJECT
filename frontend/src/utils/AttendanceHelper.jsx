import axios from "axios";
import React from "react";
import { API_URL } from "./config";

export const columns = [
  {
    name: "S NO",
    selector: (row) => row.sno,
    width: "80px", // S.No மட்டும் சிறிது குறைவாக இருந்தால்தான் அழகு
    center: true,  // எழுத்துக்களை நடுவில் வைக்கும்
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "230px", // மற்ற நான்கும் சமமான இடைவெளி (Equal Space)
    center: true,
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "230px", // Equal Space
    center: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "230px", // Equal Space
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
    width: "230px", // Equal Space
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
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
    <div className="flex justify-center">
      {status == null ? (
        <div className="flex gap-3"> {/* Space between buttons */}
          <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
          onClick={() => markEmployee("Present", employeeId)}>Present</button>
          
          <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
          onClick={() => markEmployee("Absent", employeeId)}>Absent</button>
        </div>
      ) : (
        <p className={`w-24 text-center py-1 rounded text-white font-semibold text-sm
            ${status === "Present" ? "bg-green-500" : 
              status === "Absent" ? "bg-red-500" : "bg-gray-400"}`}>
            {status}
        </p>
      )}
    </div>
  );
};