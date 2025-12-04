import React from 'react'
import { useNavigate } from 'react-router-dom'

// Accepts a new 'link' prop
const SummaryCard = ({icon, text, number, color, link}) => {
  const navigate = useNavigate()

  return (
    <div 
        // Navigates to the link when clicked
        onClick={() => link && navigate(link)}
        
        // Adds 'cursor-pointer' only if link exists
        className={`rounded-xl bg-white shadow-md p-6 flex items-center space-x-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${color.replace('bg-', 'border-')} ${link ? "cursor-pointer" : ""}`}
    >
        
        <div className={`text-3xl flex justify-center items-center ${color} text-white w-16 h-16 rounded-full shadow-sm`}>
            {icon}
        </div>
        
        <div className='flex flex-col'>
            <p className='text-gray-500 text-sm font-semibold uppercase tracking-wider'>{text}</p>
            <p className='text-3xl font-bold text-gray-800 mt-1'>{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard