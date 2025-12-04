import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// getAttendance and updateAttendance remain unchanged...
const getAttendance = async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const attendance = await Attendance.find({ date }).populate({
            path: "employeeId",
            populate: ["department", "userId"]
        });
        const validAttendance = attendance.filter(att => att.employeeId !== null && att.employeeId.userId.role !== 'admin');
        res.status(200).json({ success: true, attendance: validAttendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { status } = req.body;
        const date = new Date().toISOString().split('T')[0];
        const employee = await Employee.findOne({ employeeId });
        const attendance = await Attendance.findOneAndUpdate({ employeeId: employee._id, date }, { status }, { new: true });
        res.status(200).json({ success: true, attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Attendance Report Logic (English comments)
const attendanceReport = async (req, res) => {
    try {
        const { date, limit = 5, skip = 0 } = req.query;
        const query = {};
        if (date) {
            query.date = date;
        }

        // 1. Get unique dates from attendance records
        const distinctDates = await Attendance.find(query).distinct("date");
        
        // 2. Sort dates in descending order and apply pagination
        const sortedDates = distinctDates.sort((a, b) => b.localeCompare(a));
        const targetDates = sortedDates.slice(parseInt(skip), parseInt(skip) + parseInt(limit));

        if (targetDates.length === 0) {
            return res.status(200).json({ success: true, groupData: {} });
        }

        // 3. Fetch attendance data for the selected dates
        const attendanceData = await Attendance.find({ 
            date: { $in: targetDates } 
        })
        .populate({
            path: "employeeId",
            populate: ["department", "userId"]
        })
        .sort({ date: -1 });

        // 4. Group attendance data by date, excluding admin users
        const groupData = attendanceData.reduce((result, record) => {
            if (record.employeeId && record.employeeId.userId.role !== 'admin') {
                if (!result[record.date]) {
                    result[record.date] = [];
                }
                result[record.date].push({
                    employeeId: record.employeeId.employeeId,
                    employeeName: record.employeeId.userId.name,
                    departmentName: record.employeeId.department.dep_name,
                    status: record.status || "Not Marked",
                });
            }
            return result;
        }, {});

        return res.status(200).json({ success: true, groupData });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { getAttendance, updateAttendance, attendanceReport };