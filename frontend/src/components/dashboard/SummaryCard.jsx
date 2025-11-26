import React from 'react'
import { useNavigate } from 'react-router-dom' // 1. Import useNavigate

// 2. 'link' என்ற புதிய prop-ஐப் பெறுகிறோம்
const SummaryCard = ({icon, text, number, color, link}) => {
  const navigate = useNavigate()

  return (
    <div 
        // 3. கிளிக் செய்தால் அந்த link-க்கு செல்லும்
        onClick={() => link && navigate(link)}
        
        // 4. லிங்க் இருந்தால் மட்டும் 'cursor-pointer' வரும்
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