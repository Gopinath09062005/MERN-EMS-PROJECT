import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import axios from 'axios'
import { API_URL } from '../utils/config'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    
    
    const [loading, setLoading] = useState(false) 
    
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        
       
        setLoading(true) 
        
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password })
            if (response.data.success) {
                login(response.data.user)
                
                // Direct Storage 
                localStorage.setItem("token", response.data.token) 

                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                } else {
                    navigate('/employee-dashboard')
                }
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error)
            } else {
                setError("Server Error. Please try again.")
            }
        } finally {
            
            setLoading(false) 
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
            <h1 className="font-pacific text-4xl text-white text-center drop-shadow-lg animate-fade-in-down">
                Employee Management System
            </h1>
            
            <div className="border border-gray-200 rounded-2xl shadow-2xl p-8 w-80 md:w-96 bg-white animate-fade-in-up">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                
                {error && <div className="bg-red-50 text-red-500 text-sm p-2 rounded mb-4 border border-red-200 text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                        <input type="email" placeholder="Enter your Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                        <input type="password" placeholder="Enter your Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" 
                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <div className="mb-2">
                       
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className={`w-full font-bold py-2 rounded-lg shadow-md transition-all duration-200 flex justify-center items-center h-11
                                ${loading 
                                    ? "bg-teal-400 text-teal-50 cursor-not-allowed" 
                                    : "bg-teal-600 hover:bg-teal-700 text-white transform active:scale-95"
                                }`
                            }
                        >
                            {loading ? (
                                <>
                                    
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            <style>{`
                @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-down { animation: fadeInDown 0.8s ease-out forwards; }
                .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
            `}</style>
        </div>
    )
}
export default Login