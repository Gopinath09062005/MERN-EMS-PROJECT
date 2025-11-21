import React from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
  <h1 className="text-2xl font-bold text-center flex-1">
    EMPLOYEE MANAGEMENT SYSTEM
  </h1>
  <button
    type="button"
    onClick={() => navigate('/login')}
    className="bg-teal-800 hover:bg-teal-900 px-4 py-2 rounded"
  >
    Login
  </button>
</header>


      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center bg-gray-100 p-6">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
          {/* Image 1 */}
          <div className="text-center">
            <img
              src="src/components/images/Screenshot (70).png"
              alt="Admin and Employee Roles"
              className="w-full object-contain rounded-lg shadow mb-4"
            />
            <p className="text-gray-700 text-base">
              <strong>Admin & Employee Roles:</strong> Separate dashboards for admins and employees. 
              Admins can manage the entire system, while employees can access their profiles and submit requests.
            </p>
          </div>

          {/* Image 2 */}
          <div className="text-center">
            <img
              src="src/components/images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz1.png"
              alt="Add Employees and Departments"
              className="w-full object-contain rounded-lg shadow mb-4"
            />
            <p className="text-gray-700 text-base">
              <strong>Employee & Department Management:</strong> Easily add, edit, and organize employee details, 
              departments, and designations with just a few clicks.
            </p>
          </div>

          {/* Image 3 */}
          <div className="text-center">
            <img
              src="src/components/images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz2.png"
              alt="Salary and Attendance Tracking"
              className="w-full object-contain rounded-lg shadow mb-4"
            />
            <p className="text-gray-700 text-base">
              <strong>Salary & Attendance:</strong> Maintain accurate attendance records and calculate salaries 
              automatically based on working days, leaves, and overtime.
            </p>
          </div>

          {/* Image 4 */}
          <div className="text-center">
            <img
              src="src/components/images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz3.png"
              alt="Leave Requests and Approvals"
              className="w-full object-contain rounded-lg shadow mb-4"
            />
            <p className="text-gray-700 text-base">
              <strong>Leave Management:</strong> Employees can send leave requests directly through the portal. 
              Admins can review and approve or reject requests instantly.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-teal-600 text-white text-center py-3 mt-auto">
        © {new Date().getFullYear()} Employee Management System | All rights reserved
      </footer>
    </div>
  )
}

export default Homepage
