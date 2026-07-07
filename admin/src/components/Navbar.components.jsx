import React from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const {aToken , setAToken}=useContext(AdminContext)
    const {dToken,setDToken}=useContext(DoctorContext)

    const navigate=useNavigate()

    const logout=()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-3 text-xs'>
            <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v5.25H6a.75.75 0 000 1.5h5.25V18a.75.75 0 001.5 0v-5.25H18a.75.75 0 000-1.5h-5.25V6z" clipRule="evenodd" />
                </svg>
                <span className='text-2xl font-bold text-gray-800 tracking-tight'>
                    Medi<span className='text-primary'>Connect</span>
                </span>
            </div>
            <p className='border px-2 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken?'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar