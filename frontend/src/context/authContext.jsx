import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { API_URL } from '../utils/config'

const userContext = createContext()

const AuthContext = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
         const verifyUser = async () => {
            try {
                // Only checking localStorage now
                const token = localStorage.getItem('token')
                
                if (token) {
                    const response = await axios.get(`${API_URL}/auth/verify`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }  
                    })

                    if (response.data.success) {
                        setUser(response.data.user)
                    } else {
                        setUser(null)
                        localStorage.removeItem("token")
                    }
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.log("Authentication Error:", error)
                setUser(null)
                localStorage.removeItem("token")
            } finally {
                setLoading(false)
            }
         }
         
         verifyUser()
    }, [])

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }

    return (
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </userContext.Provider>
    )
}

export const useAuth = () => useContext(userContext)
export default AuthContext