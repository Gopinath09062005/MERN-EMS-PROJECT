import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

export const columns = [
  { 
    name: "S NO", 
    selector: (row) => row.sno, 
    width: "70px" 
  },
  { 
    name: "Name", 
    selector: (row) => row.name, 
    sortable: true, 
    width: "130px" 
  },
  { 
    name: "Image", 
    selector: (row) => row.profileImage, 
    width: "90px" 
  },
  { 
    name: "Department", 
    selector: (row) => row.dep_name, 
    // 👇 மாற்றம் இங்கே: 120px-லிருந்து 170px-ஆக மாற்றப்பட்டுள்ளது 👇
    width: "170px" 
  },
  { 
    name: "DOB", 
    selector: (row) => row.dob, 
    sortable: true, 
    width: "130px" 
  },
  { 
    // Action Header Center Fix
    name: <div style={{ width: "100%", textAlign: "center" }}>ACTION</div>, 
    selector: (row) => row.action, 
    // Action Buttons Center Fix
    style: {
        justifyContent: 'center', 
        display: 'flex',
    },
    width: "450px" 
  },
];

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get(
      `${API_URL}/department`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `${API_URL}/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ Id, onEmployeeDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3 justify-center w-full">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
      <button
        className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800 transition"
        onClick={() => onEmployeeDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};