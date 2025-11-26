import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from "react-data-table-component";
import axios from 'axios';
import { API_URL } from '../../utils/config'; 
import { FaPlus } from 'react-icons/fa';

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(`${API_URL}/employee`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => {
            
            // 👇 DEBUGGING: கன்சோலில் URL வருகிறதா என்று பார்க்க 👇
            console.log("Image URL for", emp.userId.name, ":", emp.userId.profileImage);

            return {
                _id: emp._id,
                sno: sno++,
                dep_name: emp.department.dep_name,
                name: emp.userId.name,
                dob: new Date(emp.dob).toLocaleDateString(),
                profileImage: (
                    <img 
                        width={40} 
                        height={40}
                        className='rounded-full object-cover' 
                        src={emp.userId.profileImage} 
                        alt={emp.userId.name}
                        // 👇 படம் இல்லையென்றால் Placeholder காட்டும் 👇
                        onError={(e) => {e.target.src = "https://via.placeholder.com/40?text=User"}} 
                    />
                ), 
                action: (<EmployeeButtons Id={emp._id} />),
            }
          });
          setEmployees(data);
          setFilteredEmployees(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
  }

  return (
   <div className="p-4 md:p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Manage Employees</h3>
      </div>
      
      <div className="flex justify-between items-center gap-3">
        <input
          type="text"
          placeholder="Search Employees..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 shadow-sm"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-md text-white transition shadow-sm flex items-center justify-center"
        >
          <span className="block md:hidden text-xl"><FaPlus /></span>
          <span className="hidden md:block font-semibold">Add New Employee</span>
        </Link>
      </div>

      <div className='mt-6 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden'>
        <div className="overflow-x-auto scrollbar-hide"> 
            <div style={{ minWidth: '800px' }}>
                <DataTable 
                    columns={columns} 
                    data={filteredEmployee} 
                    pagination
                    highlightOnHover
                    customStyles={{
                        headRow: {
                            style: {
                                backgroundColor: '#f3f4f6', 
                                borderBottom: '1px solid #e5e7eb',
                                minHeight: '50px',
                            },
                        },
                        headCells: {
                            style: {
                                fontSize: '14px',
                                fontWeight: '700',
                                color: '#374151',
                                textTransform: 'uppercase',
                                paddingLeft: '16px',
                            },
                        },
                        rows: {
                            style: {
                                fontSize: '14px',
                                '&:not(:last-of-type)': {
                                    borderBottomStyle: 'solid',
                                    borderBottomWidth: '1px',
                                    borderBottomColor: '#f3f4f6',
                                },
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
    </div>
  )
}
export default List