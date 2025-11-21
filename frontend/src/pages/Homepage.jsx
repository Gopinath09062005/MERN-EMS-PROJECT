import React from "react";
import { useNavigate } from "react-router-dom";

// images (adjust filenames exactly as in repo — case-sensitive)
import img1 from "./images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz.png";
import img2 from "./images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz1.png";
import img3 from "./images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz2.png";
import img4 from "./images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz3.png";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
        <h1 className="text-2xl font-bold text-center flex-1">
          EMPLOYEE MANAGEMENT SYSTEM
        </h1>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="bg-teal-800 hover:bg-teal-900 px-4 py-2 rounded"
        >
          Login
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center bg-gray-100 p-6">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <img src={img1} alt="Admin and Employee Roles" className="w-full object-contain rounded-lg shadow mb-4" />
            <p className="text-gray-700 text-base">
              <strong>Admin & Employee Roles:</strong> Separate dashboards...
            </p>
          </div>

          <div className="text-center">
            <img src={img2} alt="Add Employees and Departments" className="w-full object-contain rounded-lg shadow mb-4" />
            <p className="text-gray-700 text-base">
              <strong>Employee & Department Management:</strong> ...
            </p>
          </div>

          <div className="text-center">
            <img src={img3} alt="Salary and Attendance Tracking" className="w-full object-contain rounded-lg shadow mb-4" />
            <p className="text-gray-700 text-base">
              <strong>Salary & Attendance:</strong> ...
            </p>
          </div>

          <div className="text-center">
            <img src={img4} alt="Leave Requests and Approvals" className="w-full object-contain rounded-lg shadow mb-4" />
            <p className="text-gray-700 text-base">
              <strong>Leave Management:</strong> ...
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-teal-600 text-white text-center py-3 mt-auto">
        © {new Date().getFullYear()} Employee Management System | All rights reserved
      </footer>
    </div>
  );
};

export default Homepage;
