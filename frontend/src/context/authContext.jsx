import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const userContext = createContext()

const AuthContext = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // const navigate = useNavigate()

    useEffect(()=>{
         const verifyUser = async ()=>{
            try{
                const token = localStorage.getItem('token')
                if(token){

                const response = await axios.get('http://localhost:5000/api/auth/verify',
                //  const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`,   ///
                    {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }  
                })
                console.log(response);
                
                if(response.data.success){
                    setUser(response.data.user)
                }
            }else{
                // navigate('/login')
                setUser(null)
                setLoading(false)
            }
            }catch(error){
                console.log(error);
                
                if(error.response && !error.response.data.error){
                    // navigate('/login')
                    setUser(null)
                }
            } finally{
                setLoading(false)
            }
         }
         verifyUser()
    },[])


    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        // navigate('/login')                  /////
    }

    return (
        <div>
            <userContext.Provider value={{ user, login, logout, loading }}>
                {children}
            </userContext.Provider>
        </div>
    )
}

export const useAuth = ()=> useContext(userContext)
export default AuthContext

