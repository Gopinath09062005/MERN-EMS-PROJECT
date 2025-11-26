import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBaseRoutes = ({children, requiredRole}) => {
    const {user, loading} = useAuth()

    if(loading){
        return <div>Loading...</div>
    }

    // Role check
    if(!requiredRole.includes(user.role)){
        // பயனர் Admin இல்லையென்றால், unauthorized பக்கத்திற்கோ அல்லது Login-க்கோ அனுப்பலாம்
        return <Navigate to="/unauthorized"/> 
    }

    return user ? children : <Navigate to="/login" />
}

export default RoleBaseRoutes