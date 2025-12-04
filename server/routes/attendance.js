import express from 'express'
import { getAttendance, updateAttendance, attendanceReport } from '../controllers/attendanceController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import defaultAttendance from '../middleware/defaultAttendance.js' // 1. Import This

const router = express.Router()

// 2. Add 'defaultAttendance' here 
router.get('/', authMiddleware, defaultAttendance, getAttendance) 

router.put('/update/:employeeId', authMiddleware, updateAttendance)
router.get('/report', authMiddleware, attendanceReport)

export default router