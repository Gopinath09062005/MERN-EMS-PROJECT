// controllers/employeeController.js
import multer from "multer";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import Department from "../models/Department.js";

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ensure this folder exists in your repo: public/uploads
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 169...png
  },
});

const upload = multer({ storage: storage });

const getImageBaseUrl = () => {
  return process.env.BASE_URL || "http://localhost:5000"; // set BASE_URL in production to your server URL
};

const buildUserWithImageUrl = (userDoc) => {
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  if (user.profileImage) {
    user.profileImage = `${getImageBaseUrl()}/images/${user.profileImage}`;
  } else {
    user.profileImage = "";
  }
  // remove password if present
  if (user.password) delete user.password;
  return user;
};

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: "User already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    // return user with full image url
    const userToReturn = buildUserWithImageUrl(savedUser);

    return res.status(200).json({ success: true, message: "employee created", user: userToReturn });
  } catch (error) {
    console.error("addEmployee error:", error.message);
    return res.status(500).json({ success: false, error: "server error in adding employees" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");

    // build proper profileImage URLs for each populated user
    const employeesWithUrls = employees.map((emp) => {
      const empObj = emp.toObject();
      if (empObj.userId && empObj.userId.profileImage) {
        empObj.userId.profileImage = `${getImageBaseUrl()}/images/${empObj.userId.profileImage}`;
      } else if (empObj.userId) {
        empObj.userId.profileImage = "";
      }
      return empObj;
    });

    return res.status(200).json({ success: true, employees: employeesWithUrls });
  } catch (error) {
    console.error("getEmployees error:", error.message);
    return res.status(500).json({ success: false, error: "get employees server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    let employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    if (!employee) {
      return res.status(404).json({ success: false, error: "employee not found" });
    }

    const empObj = employee.toObject();
    if (empObj.userId && empObj.userId.profileImage) {
      empObj.userId.profileImage = `${getImageBaseUrl()}/images/${empObj.userId.profileImage}`;
    } else if (empObj.userId) {
      empObj.userId.profileImage = "";
    }

    return res.status(200).json({ success: true, employee: empObj });
  } catch (error) {
    console.error("getEmployee error:", error.message);
    return res.status(500).json({ success: false, error: "get employee server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res.status(404).json({ success: false, error: "employee not found" });
    }
    const user = await User.findById({ _id: employee.userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    const updateUser = await User.findByIdAndUpdate({ _id: employee.userId }, { name }, { new: true });
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        maritalStatus,
        designation,
        salary,
        department,
      },
      { new: true }
    );

    if (!updateEmployee || !updateUser) {
      return res.status(404).json({ success: false, error: "document not found" });
    }

    // return updated employee with profile image url
    const empPop = await Employee.findById(id).populate("userId", { password: 0 }).populate("department");
    const empObj = empPop.toObject();
    if (empObj.userId && empObj.userId.profileImage) {
      empObj.userId.profileImage = `${getImageBaseUrl()}/images/${empObj.userId.profileImage}`;
    } else if (empObj.userId) {
      empObj.userId.profileImage = "";
    }

    return res.status(200).json({ success: true, message: "employee updated", employee: empObj });
  } catch (error) {
    console.error("updateEmployee error:", error.message);
    return res.status(500).json({ success: false, error: "update employees server error" });
  }
};

const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.find({ department: id });
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("fetchEmployeesByDepId error:", error.message);
    return res.status(500).json({ success: false, error: "get employeesByDepId server error" });
  }
};

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId };
