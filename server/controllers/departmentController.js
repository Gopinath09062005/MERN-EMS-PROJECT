import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get department server error" });
  }
};

// 👇👇👇 UPDATED addDepartment FUNCTION 👇👇👇
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    // 1. Check if department already exists (Case Insensitive)
    // collation({ locale: 'en', strength: 2 }) என்பது எழுத்து வடிவத்தை (Capital/Small) புறக்கணிக்கும்.
    const existingDep = await Department.findOne({ 
        dep_name: { $regex: new RegExp(`^${dep_name}$`, "i") } 
    });

    if (existingDep) {
        return res.status(400).json({ success: false, error: "Department already exists" });
    }

    const newDep = new Department({
      dep_name,
      description,
    });

    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "add department server error" });
  }
};
// 👆👆👆 UPDATED FUNCTION END 👆👆👆

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({ success: false, error: "get department server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ success: true, updateDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "edit department server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDep = await Department.findById(id); // Fixed: findById instead of findByIdAndDelete directly for cascade logic
    if(deleteDep) {
        await deleteDep.deleteOne()
    }
    return res.status(200).json({ success: true, deleteDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "delete department server error" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};