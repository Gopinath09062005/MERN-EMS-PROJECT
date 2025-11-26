import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import { API_URL } from "../../utils/config";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments()
  };

  const fetchDepartments = async () => {
    setDepLoading(true)
    try {
      const response = await axios.get(`${API_URL}/department`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (<DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
        }))
        setDepartments(data)
        setFilteredDepartments(data)
      }
    } catch(error) {
      if(error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    } finally {
      setDepLoading(false)
    }
  }

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records)              
  };

  return (
    <>
      {depLoading ? 
        <div className="flex justify-center items-center h-screen">Loading...</div>
       : 
        <div className="p-6">
          
          {/* 1. Stylish Header */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Manage Departments</h3>
          </div>

          {/* 2. Responsive Search & Add Button */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Search By Dept Name"
              className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto focus:outline-none focus:border-teal-500 shadow-sm transition"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-semibold shadow-sm transition duration-300"
            >
              + Add New Department
            </Link>
          </div>

          {/* 3. Enhanced Table Design */}
          <div className="bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <DataTable 
                    columns={columns} 
                    data={filteredDepartments} 
                    pagination 
                    customStyles={{
                        headRow: {
                            style: {
                                backgroundColor: '#f9fafb', // Light gray header
                                borderBottom: '1px solid #e5e7eb',
                                minHeight: '50px',
                            },
                        },
                        headCells: {
                            style: {
                                fontSize: '15px',
                                fontWeight: '700',
                                color: '#374151', // Dark gray text
                                textTransform: 'uppercase',
                                paddingLeft: '20px',
                            },
                        },
                        cells: {
                            style: {
                                fontSize: '15px',
                                paddingLeft: '20px',
                                paddingRight: '20px',
                                paddingTop: '12px',
                                paddingBottom: '12px',
                            },
                        },
                    }}
                />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default DepartmentList;