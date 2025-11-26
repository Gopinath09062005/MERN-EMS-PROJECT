import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import attendanceRouter from "./routes/attendance.js";
import dashboardRouter from "./routes/dashboard.js";
import connectToDatabase from "./config/db.js";
import path from "path"; // 1. இதை மறக்காமல் Import செய்யவும்

connectToDatabase();
const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://mern-ems-project-frontend.vercel.app"],
    credentials: true
}));

app.use(express.json());

// 2. 👇 இந்த வரிகளை அப்படியே மாற்றவும் (Static File Serving) 👇
// இது public/uploads ஃபோல்டரை 'http://localhost:5000/uploads' என்ற முகவரியில் திறக்கும்
app.use('/uploads', express.static('public/uploads'));

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/attendance", attendanceRouter);
app.use("/api/dashboard", dashboardRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});