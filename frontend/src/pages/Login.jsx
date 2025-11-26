import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { API_URL } from "../utils/config";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password })
            if (response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                } else {
                    navigate("/employee-dashboard")
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Server Error")
            }
        }
    }

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6 px-4">
            
            {/* Title */}
            <h1 className="font-pacific text-3xl md:text-4xl text-white text-center tracking-wide drop-shadow-md">
                Employee Management System
            </h1>
            
            {/* Login Card */}
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded mb-4 border border-red-200 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter your Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition duration-200" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition duration-200" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-6 flex items-center justify-between text-sm">
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="form-checkbox text-teal-600 h-4 w-4 rounded focus:ring-teal-500" />
                            <span className="ml-2 text-gray-600 select-none">Remember me</span>
                        </label>
                        <a href="#" className="text-teal-600 font-medium hover:underline hover:text-teal-700">Forgot Password?</a>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-[1.02] active:scale-95"
                    >
                        Login
                    </button>
                </form>
            </div>

            {/* Footer (Optional) */}
            <div className="text-gray-400 text-xs mt-4">
                &copy; {new Date().getFullYear()} EMS System. All rights reserved.
            </div>
        </div>
    )
}

export default Login