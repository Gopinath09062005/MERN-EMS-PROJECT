import { login, verify } from "../controllers/authController.js"
import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// fixed route path
router.post('/login', login)        //
router.get('/verify', authMiddleware, verify)        //


export default router