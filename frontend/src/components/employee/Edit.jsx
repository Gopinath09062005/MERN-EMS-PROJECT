import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../utils/config";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${API_URL}/employee/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          const emp = response.data.employee;
          setEmployee({
            name: emp.userId.name,
            maritalStatus: emp.maritalStatus,
            designation: emp.designation,
            salary: emp.salary,
            department: emp.department,
          });
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
        setEmployee((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 👇 FormData பயன்படுத்துகிறோம் (Image Upload-க்காக)
    const formDataObj = new FormData();
    Object.keys(employee).forEach((key) => {
      formDataObj.append(key, employee[key]);
    });

    try {
      const response = await axios.put(
        `${API_URL}/employee/${id}`,
        formDataObj, // JSON-க்கு பதில் FormData அனுப்புகிறோம்
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments && employee ? (
        <div className="max-w-4xl mx-auto mt-20 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={employee.name} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                <select name="maritalStatus" onChange={handleChange} value={employee.maritalStatus} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input type="text" name="designation" onChange={handleChange} value={employee.designation} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input type="number" name="salary" onChange={handleChange} value={employee.salary} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select name="department" onChange={handleChange} value={employee.department} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))}
                </select>
              </div>

              {/* 👇 புதிய Image Input Field 👇 */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Update Image (Optional)</label>
                <input type="file" name="image" onChange={handleChange} accept="image/*" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
              </div>

            </div>

            <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">Edit Employee</button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Edit;