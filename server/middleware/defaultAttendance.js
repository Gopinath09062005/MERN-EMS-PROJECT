import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0];

    // 🔹 Get all employees
    const employees = await Employee.find({});
    // 🔹 Get all attendance records for today
    const todayAttendance = await Attendance.find({ date });

    // 🔹 Extract employee IDs who already have attendance
    const attendedIds = todayAttendance.map((a) => a.employeeId.toString());

    // 🔹 Find employees missing attendance
    const missingEmployees = employees.filter(
      (emp) => !attendedIds.includes(emp._id.toString())
    );

    // 🔹 Add attendance records only for missing employees
    if (missingEmployees.length > 0) {
      const newRecords = missingEmployees.map((emp) => ({
        date,
        employeeId: emp._id,
        status: null,
      }));
      await Attendance.insertMany(newRecords);
      console.log(`✅ Added ${newRecords.length} new attendance records`);
    }

    next();
  } catch (error) {
    console.error("defaultAttendance error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default defaultAttendance;
