import User from "./models/User.js"
import bcrypt from 'bcrypt'
import connectToDatabase from "./config/db.js"
import 'dotenv/config'

const userRegister = async () => {
  await connectToDatabase()
  try {
    const existing = await User.findOne({ email: "admin@gmail.com" })
    if (!existing) {
      const hashPassword = await bcrypt.hash("admin", 10)
      const newUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashPassword,
        role: "admin"
      })
      await newUser.save()
      console.log("✅ Admin user created successfully");
    } else {
      console.log("⚠️ Admin user already exists");
    }
  } catch (error) {
    console.log("❌ Error seeding admin:", error);
  } finally {
    // Close connection properly
    // mongoose.connection.close(); 
    process.exit(0)
  }
}

userRegister()