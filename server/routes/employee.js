import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId } from '../controllers/employeeController.js'

const router = express.Router()

router.get('/', authMiddleware, getEmployees)
router.post('/add', authMiddleware, upload.single('image'), addEmployee)
router.get('/:id', authMiddleware, getEmployee)

// 👇 இங்கே மாற்றம் செய்ய வேண்டும் (upload.single('image') சேர்க்கவும்) 👇
router.put('/:id', authMiddleware, upload.single('image'), updateEmployee)

router.get('/department/:id', authMiddleware, fetchEmployeesByDepId)

export default router