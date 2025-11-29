import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from '../../utils/AttendanceHelper';
import DataTable from "react-data-table-component";
import axios from 'axios';
import { API_URL } from '../../utils/config';

const Attendance = () => {
  const [attendance, setAttendance] = useState([])
  
  // 1. Loading ஆரம்பத்தில் true ஆக இருக்கும்
  const [loading, setLoading] = useState(true); 
  const [filteredAttendance, setFilteredAttendance] = useState(null)

  const statusChange = () => {
    // 2. பட்டனை கிளிக் செய்யும்போது Loading காட்டக்கூடாது (false அனுப்பவும்)
    fetchAttendance(false) 
  }

  // isLoading=true என்றால் லோடிங் காட்டும், false என்றால் பின்னணியில் நடக்கும்
  const fetchAttendance = async (isLoading = true) => {
      if(isLoading) {
        setLoading(true);
      }
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
        setLoading(false); // வேலை முடிந்ததும் லோடிங் நிறுத்து
      }
    };

  useEffect(() => {
    fetchAttendance(true); // முதல் முறை மட்டும் லோடிங் காட்டு
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((emp) => (
      emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredAttendance(records)
  }

  return (
   <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Manage Attendance</h3>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6">
        <input 
            type="text" 
            placeholder="Search By Emp ID" 
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500 w-full md:w-64" 
            onChange={handleFilter} 
        />
        <p className='text-lg font-medium'>
            Mark Employees for <span className='font-bold text-teal-700 underline'>{new Date().toISOString().split("T")[0]}</span>
        </p>
        <Link 
            to="/admin-dashboard/attendance-report" 
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition shadow-sm"
        >
            Attendance Report
        </Link>
      </div>

      {/* 👇 LOADING FIX & SPACING FIX 👇 */}
      <div className='mt-6 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden'>
        
        {/* லோடிங் இருந்தால் மட்டும் ஸ்பின்னரை காட்டு, இல்லையென்றால் டேபிளை காட்டு */}
        {loading ? (
            <div className="flex justify-center items-center p-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-600"></div>
            </div>
        ) : (
            <div className="overflow-x-scroll">
                <div style={{ minWidth: '1000px' }}>
                    <DataTable 
                        columns={columns} 
                        data={filteredAttendance} 
                        pagination 
                        // 👇 Spacing Fix: dense mode அல்லது padding குறைத்தல்
                        dense 
                        customStyles={{
                            headRow: { style: { backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', minHeight: '50px' } },
                            headCells: { style: { fontSize: '15px', fontWeight: '600', textTransform: 'uppercase', color: '#374151' } },
                            cells: { style: { fontSize: '14px', padding: '10px' } }, // Padding குறைக்கப்பட்டது
                        }}
                    />
                </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Attendance