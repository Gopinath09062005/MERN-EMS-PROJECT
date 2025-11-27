import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0];

    // 1. தற்போது உள்ள உண்மையான Employees-ஐ எடு
    const employees = await Employee.find({});
    const employeeIds = employees.map(e => e._id.toString());

    // 2. இன்றைய தேதிக்கு ஏற்கனவே உள்ள அட்டெண்டன்ஸ் பதிவுகளை எடு
    const existingAttendance = await Attendance.find({ date });

    // 3. CLEANUP: இல்லாத Employee-களின் அட்டெண்டன்ஸ் பதிவுகளை நீக்கு
    // (இதுதான் உங்கள் பிரச்சனையை சரிசெய்யும் மேஜிக்)
    const invalidAttendance = existingAttendance.filter(att => 
        !employeeIds.includes(att.employeeId.toString())
    );

    if (invalidAttendance.length > 0) {
        const invalidIds = invalidAttendance.map(att => att._id);
        await Attendance.deleteMany({ _id: { $in: invalidIds } });
        console.log(`🧹 Cleaned up ${invalidAttendance.length} invalid attendance records.`);
    }

    // 4. இப்போது, விடுபட்டவர்களுக்கு மட்டும் புதிதாக உருவாக்கு
    // (Cleanup செய்த பிறகு மீண்டும் செக் செய்கிறோம்)
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
      console.log(`✅ Created ${newRecords.length} new attendance records.`);
    }

    next(); 
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export default defaultAttendance;