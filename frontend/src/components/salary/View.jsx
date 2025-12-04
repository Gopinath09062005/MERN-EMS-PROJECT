import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import { useAuth } from '../../context/authContext';
import { API_URL } from "../../utils/config";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams()
  let sno = 1;
  const {user} = useAuth()

  const fetchSalareis = async () => {
    try {
       const response = await axios.get(`${API_URL}/salary/${id}/${user.role}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
       })
       if(response.data.success) {
        setSalaries(response.data.salary)
        setFilteredSalaries(response.data.salary)
       }
    } catch(error) {
      if (error.response && !error.response.data.success) {
        alert(error.message)
      }
    }
  }

useEffect(() => {
  fetchSalareis()
}, [])

  return (
    <>
    {filteredSalaries === null ? (
      <div>Loading....</div>
    ) : (
      <div className='p-5'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-5'>Salary History</h2>
        </div>

        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            {filteredSalaries.length > 0 ? (
              <table className='w-full text-sm text-left text-gray-500 min-w-[800px]'> 
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                  <tr>
                    <th className='px-6 py-3'>SNO</th>
                    <th className='px-6 py-3'>Emp ID</th>
                    <th className='px-6 py-3'>Salary</th>
                    <th className='px-6 py-3'>Allowance</th>
                    <th className='px-6 py-3'>Deduction</th>
                    <th className='px-6 py-3'>Total</th>
                    <th className='px-6 py-3'>Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr key={salary._id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                      <td className='px-6 py-3'>{sno++}</td>
                      <td className='px-6 py-3'>{salary.employeeId.employeeId}</td>
                      <td className='px-6 py-3'>{salary.basicSalary}</td>
                      <td className='px-6 py-3'>{salary.allowances}</td>
                      <td className='px-6 py-3'>{salary.deductions}</td>
                      <td className='px-6 py-3'>{salary.netSalary}</td>
                      <td className='px-6 py-3'>{new Date(salary.payDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ): <div className="p-4 text-center">No Records</div>}
        </div>
      </div>
    )}
    </>
  )
}
export default View