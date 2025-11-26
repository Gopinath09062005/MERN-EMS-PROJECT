import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from "react-data-table-component";
import axios from 'axios';
import { API_URL, SERVER_URL } from '../../utils/config';

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
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: <img width={40} className='rounded-full' src={`${SERVER_URL}/uploads/${emp.userId.profileImage}`} alt={emp.userId.name} />, 
            action: (<EmployeeButtons Id={emp._id} />),
          }));
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
   <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <input
          type="text"
          placeholder="Search By Name"
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto focus:outline-none focus:border-teal-500"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white w-full md:w-auto text-center font-semibold transition"
        >
          Add New Employee
        </Link>
      </div>

      {/* --- FINAL SCROLL FIX --- */}
      <div className='mt-6 bg-white shadow-md rounded-lg border border-gray-200'>
        
        {/* 1. overflow-x-scroll: இது கண்டிப்பாக ஸ்க்ரோல் பாரை வரவழைக்கும் */}
        <div className="overflow-x-scroll">
            
            {/* 2. style={{ minWidth: '1000px' }}: இது டேபிளை சுருங்க விடாமல் தடுக்கும்.
                   மொபைல் ஸ்க்ரீன் 360px தான் இருக்கும், ஆனால் இந்த டிவ் 1000px இருக்கும்.
                   அதனால் கண்டிப்பாக ஸ்க்ரோல் வரும். */}
            <div className="p-2" style={{ minWidth: '1000px' }}>
                <DataTable 
                    columns={columns} 
                    data={filteredEmployee} 
                    pagination
                    customStyles={{
                        headRow: {
                            style: {
                                backgroundColor: '#f9fafb',
                                borderBottom: '1px solid #e5e7eb',
                            },
                        },
                        headCells: {
                            style: {
                                fontSize: '15px',
                                fontWeight: '600',
                                color: '#374151',
                                textTransform: 'uppercase',
                            },
                        },
                        cells: {
                            style: {
                                fontSize: '14px',
                                padding: '12px',
                            },
                        },
                    }}
                />
            </div>
        </div>
      </div>
      {/* --- END FIX --- */}

    </div>
  )
}
export default List