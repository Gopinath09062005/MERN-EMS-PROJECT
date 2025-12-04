import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0];

    // 1. Get all current employees
    const employees = await Employee.find({});
    const employeeIds = employees.map(e => e._id.toString());

    // 2. Get existing attendance records for today
    const existingAttendance = await Attendance.find({ date });

    // 3. CLEANUP: Remove attendance records for non-existent employees
    const invalidAttendance = existingAttendance.filter(att => 
        !employeeIds.includes(att.employeeId.toString())
    );

    if (invalidAttendance.length > 0) {
        const invalidIds = invalidAttendance.map(att => att._id);
        await Attendance.deleteMany({ _id: { $in: invalidIds } });
        console.log(`Cleaned up ${invalidAttendance.length} invalid attendance records.`);
    }

    // 4. Create new attendance records for missing employees
    const updatedAttendance = await Attendance.find({ date });
    const attendedEmployeeIds = updatedAttendance.map((att) => 
        att.employeeId.toString()
    );

    const missingEmployees = employees.filter((emp) => 
        !attendedEmployeeIds.includes(emp._id.toString())
    );

    if (missingEmployees.length > 0) {
      const newRecords = missingEmployees.map((emp) => ({
        date,
        employeeId: emp._id,
        status: null, // "Not Marked"
      }));

      await Attendance.insertMany(newRecords);
      console.log(`Created ${newRecords.length} new attendance records.`);
    }

    next(); 
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default defaultAttendance;
