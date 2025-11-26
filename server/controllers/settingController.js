import User from "../models/User.js"
import bcrypt from 'bcrypt'

const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body

        // 1. Check if old and new passwords are the same (NEW FIX)
        if (oldPassword === newPassword) {
            return res.status(400).json({ success: false, error: "New password cannot be same as old password" });
        }

        const user = await User.findById({ _id: userId })
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(404).json({ success: false, error: "Wrong old password" })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)

        const newUser = await User.findByIdAndUpdate({ _id: userId }, { password: hashPassword })

        return res.status(200).json({ success: true })

    } catch (error) {
        return res.status(500).json({ success: false, error: "setting error" })
    }
}

export { changePassword }