import React from "react";
import { useNavigate } from "react-router-dom";
// படங்களை Import செய்கிறோம் (Ensure images are in src/components/images/)
import img1 from "../components/images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz.png"
import img2 from "../components/images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz1.png"
import img3 from "../components/images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz2.png"
import img4 from "../components/images/Gemini_Generated_Image_vrvzr9vrvzr9vrvz3.png"

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-teal-600 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50">
        <h1 className="text-2xl font-bold font-pacific flex-1">
          EMPLOYEE MANAGEMENT SYSTEM
        </h1>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="bg-teal-800 hover:bg-teal-900 px-4 py-2 rounded transition-colors font-semibold"
        >
          Login
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center bg-gray-100 p-6 mt-16">
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10">
          
          {/* Card 1 */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={img1} alt="Admin Role" className="w-full h-48 object-contain mb-4" />
            <h3 className="text-lg font-bold text-teal-700">Admin & Employee Roles</h3>
            <p className="text-gray-600 mt-2">
              Separate dashboards for admins and employees. Admins maintain control while employees access personal data securely.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={img2} alt="Management" className="w-full h-48 object-contain mb-4" />
             <h3 className="text-lg font-bold text-teal-700">Department Management</h3>
            <p className="text-gray-600 mt-2">
              Organize your workforce effectively. Create, edit, and manage departments and designations seamlessly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={img3} alt="Salary" className="w-full h-48 object-contain mb-4" />
             <h3 className="text-lg font-bold text-teal-700">Payroll System</h3>
            <p className="text-gray-600 mt-2">
              Automated salary calculations based on attendance and leaves. Manage allowances and deductions easily.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={img4} alt="Leaves" className="w-full h-48 object-contain mb-4" />
             <h3 className="text-lg font-bold text-teal-700">Leave Management</h3>
            <p className="text-gray-600 mt-2">
              Streamlined leave request process. Employees apply online, and admins can approve or reject with a click.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-teal-600 text-white text-center py-4 mt-auto">
        <p>© {new Date().getFullYear()} Employee Management System | Built with MERN Stack</p>
      </footer>
    </div>
  );
};

export default Homepage;