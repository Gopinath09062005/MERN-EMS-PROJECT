import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./Leave.js";
import Salary from "./Salary.js";

const departmentSchema = new mongoose.Schema({
    dep_name: {type: String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

// Cascade Delete Middleware
departmentSchema.pre("deleteOne", {document: true, query: false}, async function(next) {
    try {
        const employees = await Employee.find({department: this._id})
        const empIds = employees.map(emp => emp._id)

        // Delete related Employees
        await Employee.deleteMany({department: this._id})
        // Delete related Leaves
        await Leave.deleteMany({employeeId: {$in : empIds}})
        // Delete related Salaries
        await Salary.deleteMany({employeeId: {$in : empIds}})
        // Delete Users associated with employees (Optional but good for cleanup)
        // const userIds = employees.map(emp => emp.userId)
        // await User.deleteMany({_id: {$in: userIds}})

        next()
    } catch (error) {
        next(error)
    }
})

const Department = mongoose.model("Department", departmentSchema)
export default Department