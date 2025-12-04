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
        // If user is not Admin, redirect to unauthorized page or Login
        return <Navigate to="/unauthorized"/> 
    }

    return user ? children : <Navigate to="/login" />
}

export default RoleBaseRoutes