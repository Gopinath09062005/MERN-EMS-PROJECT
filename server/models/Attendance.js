import mongoose, { mongo } from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    date: {
        type: String,   
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent"],
        default: null
    }
})

const Attendance = mongoose.model("Attendance", AttendanceSchema)
export default Attendance;