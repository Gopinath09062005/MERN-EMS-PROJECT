import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from '../../utils/AttendanceHelper';
import DataTable from "react-data-table-component";
import axios from 'axios';
import { API_URL } from '../../utils/config';

const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState(null)

  const statusChange = () => {
    fetchAttendance()
  }

  const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/attendance`,{
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.attendance.map((att) => ({
            employeeId: att.employeeId.employeeId,
            sno: sno++,
            department: att.employeeId.department.dep_name,
            name: att.employeeId.userId.name,
            action: (<AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange} />),
          }));
          setAttendance(data);
          setFilteredAttendance(data)
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((emp) => (
      emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredAttendance(records)
  }

  if (!filteredAttendance) {
    return <div>Loading...</div>
  }

  return (
   <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>
      
      {/* Responsive Search & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <input type="text" placeholder="Search By Emp ID" className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto focus:outline-none focus:border-teal-500" onChange={handleFilter} />
        <p className='text-lg md:text-2xl'>
            Mark Employees for <span className='font-bold underline'>{new Date().toISOString().split("T")[0]}{" "}</span>
        </p>
        <Link to="/admin-dashboard/attendance-report" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">Attendance Report</Link>
      </div>

      {/* --- SCROLL FIX START --- */}
      <div className='mt-6 bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden'>
        <div className="overflow-x-scroll">
            <div style={{ minWidth: '1000px' }}> {/* Force min width */}
                <DataTable 
                    columns={columns} 
                    data={filteredAttendance} 
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
                                textTransform: 'uppercase',
                                color: '#374151',
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
      {/* --- SCROLL FIX END --- */}
    </div>
  )
}

export default Attendance