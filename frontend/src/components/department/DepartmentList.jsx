import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { FaPlus } from "react-icons/fa"; // Icon சேர்த்துள்ளேன்

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
        <div className="p-2 md:p-6"> {/* Mobile padding reduced */}
          
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Manage Departments</h3>
          </div>

          {/* Responsive Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search By Dept Name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto focus:outline-none focus:border-teal-500"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-2 bg-teal-600 text-white rounded-md flex items-center justify-center hover:bg-teal-700 transition w-full md:w-auto"
            >
              <FaPlus /> <span className="ml-2">Add New Department</span>
            </Link>
          </div>

          {/* 👇 SCROLL FIX 👇 */}
          <div className="bg-white shadow-lg rounded-lg border border-gray-200">
            
            {/* overflow-x-auto enables scroll */}
            <div style={{ overflowX: "auto" }}>
                
                {/* minWidth: 500px enough for Dept table (fewer columns) */}
                <div style={{ minWidth: "500px" }}> 
                    <DataTable 
                        columns={columns} 
                        data={filteredDepartments} 
                        pagination 
                        customStyles={{
                            headRow: {
                                style: {
                                    backgroundColor: '#f9fafb',
                                    borderBottom: '1px solid #e5e7eb',
                                    minHeight: '50px',
                                },
                            },
                            headCells: {
                                style: {
                                    fontSize: '15px',
                                    fontWeight: '700',
                                    color: '#374151',
                                    textTransform: 'uppercase',
                                    paddingLeft: '16px',
                                },
                            },
                            cells: {
                                style: {
                                    paddingLeft: '16px',
                                    paddingRight: '16px',
                                },
                            },
                        }}
                    />
                </div>
            </div>
          </div>
          {/* 👆 FIX END 👆 */}

        </div>
      }
    </>
  );
};

export default DepartmentList;