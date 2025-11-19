import Employee from "../models/Employee.js"
import Salary from "../models/Salary.js"

const addSalary = async (req, res) => {
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body

        const totalSalary = parseInt(basicSalary) + parseInt(allowances - parseInt(deductions))
    
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        })

        await newSalary.save()

        return res.status(200).json({success: true})
    
    } catch(error) {
        return res.status(500).json({success:  false, error: "salary add server error"})
    }
}

const getSalary = async (req, res) => {
 try {
    const {id,role} = req.params;

    let salary
    if(role === "admin") {
        salary = await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
    } else {
        const employee = await Employee.findOne({userId: id})
        salary = await Salary.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
    }
    return res.status(200).json({success: true, salary})
 } catch(error) {
        return res.status(500).json({success:  false, error: "salary get server error"})
    } 
}

export {addSalary, getSalary}






// import Employee from "../models/Employee.js";
// import Salary from "../models/Salary.js";

// const addSalary = async (req, res) => {
//   try {
//     const { employeeId, basicSalary, allowances = 0, deductions = 0, payDate } = req.body;

//     if (!employeeId || !basicSalary || !payDate) {
//       return res.status(400).json({ success: false, error: "Missing required fields (employeeId, basicSalary, payDate)" });
//     }

//     const employee = await Employee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({ success: false, error: "Employee not found" });
//     }

//     const netSalary = Number(basicSalary) + Number(allowances) - Number(deductions);

//     const newSalary = new Salary({
//       employeeId,
//       basicSalary: Number(basicSalary),
//       allowances: Number(allowances),
//       deductions: Number(deductions),
//       netSalary,
//       payDate: new Date(payDate),
//     });

//     await newSalary.save();

//     return res.status(201).json({ success: true, salary: newSalary });
//   } catch (error) {
//     console.error("addSalary error:", error);
//     return res.status(500).json({ success: false, error: "salary add server error" });
//   }
// };

// const getSalary = async (req, res) => {
//   try {
//     const { id } = req.params;
//     let salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');

//     if (!salary || salary.length === 0) {
//       const employee = await Employee.findOne({ userId: id });
//       if (!employee) {
//         return res.status(404).json({ success: false, error: "No salary records or employee found" });
//       }
//       salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
//     }

//     return res.status(200).json({ success: true, salary });
//   } catch (error) {
//     console.error("getSalary error:", error);
//     return res.status(500).json({ success: false, error: "salary get server error" });
//   }
// };

// export { addSalary, getSalary };

