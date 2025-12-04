import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from "react-data-table-component";
import axios from 'axios';
import { API_URL, SERVER_URL } from '../../utils/config';
import { FaPlus } from 'react-icons/fa';

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([])

  // 1. Function to fetch employee data (for refresh)
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
          profileImage: (
              <img 
                  style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}}
                  src={emp.userId.profileImage} 
                  alt={emp.userId.name} 
              />
          ), 
          // 3. Passing onEmployeeDelete function inside
          action: (<EmployeeButtons Id={emp._id} onEmployeeDelete={onEmployeeDelete} />),
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
          
          // Change here: Filter out users without admin role
          const data = response.data.employees
            .filter((emp) => emp.userId.role !== "admin") // This line will hide admin users
            .map((emp) => ({
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
                  />
              ), 
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

  const onEmployeeDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this employee?");
    if (confirm) {
        try {
            const response = await axios.delete(`${API_URL}/employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                fetchEmployees(); 
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }
  };

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
      
      <div className="flex justify-between items-center gap-3 mb-4">
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

      <div className='mt-6 bg-white shadow-lg rounded-lg border border-gray-200'>
        <div style={{ overflowX: "auto" }}> 
            <div style={{ minWidth: '1000px' }}>
                <DataTable 
                    columns={columns} 
                    data={filteredEmployee} 
                    pagination
                    highlightOnHover
                    customStyles={{
                        headRow: { style: { backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb', minHeight: '50px' } },
                        headCells: { style: { fontSize: '14px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', paddingLeft: '16px' } },
                        cells: { style: { paddingLeft: '16px', paddingRight: '16px' } },
                    }}
                />
            </div>
        </div>
      </div>
    </div>
  )
}
export default List