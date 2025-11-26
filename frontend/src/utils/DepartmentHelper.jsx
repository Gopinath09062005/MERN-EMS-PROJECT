import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";

export const columns = [
  { 
    name: "S NO", 
    selector: (row) => row.sno,
    width: "100px" // Fixed width for better look
  },
  { 
    name: "Department Name", 
    selector: (row) => row.dep_name, 
    sortable: true 
  },
  { 
    name: "Action", 
    selector: (row) => row.action,
    center: true // Center align buttons
  },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `${API_URL}/department/${id}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3 justify-center">
      <button
        className="px-4 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition duration-200 shadow-sm font-medium"
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200 shadow-sm font-medium"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};