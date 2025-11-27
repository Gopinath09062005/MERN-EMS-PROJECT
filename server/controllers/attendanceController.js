import Attendance from "../models/Attendance.js"
import Employee from "../models/Employee.js"

// getAttendance மற்றும் updateAttendance பழையபடியே இருக்கட்டும்...
const getAttendance = async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0]
        const attendance = await Attendance.find({date}).populate({
            path: "employeeId",
            populate: ["department", "userId"]
        })
        const validAttendance = attendance.filter(att => att.employeeId !== null && att.employeeId.userId.role !== 'admin');
        res.status(200).json({success: true, attendance: validAttendance})
    } catch(error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const updateAttendance = async (req,res) => {
    try {
        const {employeeId} = req.params
        const {status} = req.body
        const date = new Date().toISOString().split('T')[0]
        const employee = await Employee.findOne({employeeId})
        const attendance = await Attendance.findOneAndUpdate({employeeId: employee._id, date}, {status}, {new: true})
        res.status(200).json({success: true, attendance})
    } catch(error) {
        res.status(500).json({success:false, message: error.message})
    }
}

// 👇👇👇 FIX: CORRECT ATTENDANCE REPORT LOGIC 👇👇👇
const attendanceReport = async (req, res) => {
    try {
        const { date, limit = 5, skip = 0 } = req.query;
        const query = {};
        if (date) {
            query.date = date;
        }

        // 1. தனித்துவமான தேதிகளை (Unique Dates) மட்டும் முதலில் எடுக்கிறோம்
        const distinctDates = await Attendance.find(query).distinct("date");
        
        // 2. அந்த தேதிகளை வரிசைப்படுத்தி (Sort), தேவையானதை மட்டும் எடுக்கிறோம் (Pagination)
        const sortedDates = distinctDates.sort((a, b) => b.localeCompare(a)); // Descending Sort
        const targetDates = sortedDates.slice(parseInt(skip), parseInt(skip) + parseInt(limit));

        if (targetDates.length === 0) {
             return res.status(200).json({ success: true, groupData: {} });
        }

        // 3. தேர்ந்தெடுத்த அந்த 5 நாட்களுக்கான முழு டேட்டாவையும் எடுக்கிறோம்
        const attendanceData = await Attendance.find({ 
            date: { $in: targetDates } 
        })
        .populate({
            path: "employeeId",
            populate: ["department", "userId"]
        })
        .sort({ date: -1 });

        // 4. Grouping Logic (Admin Filter Included)
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
}

export { getAttendance, updateAttendance, attendanceReport };