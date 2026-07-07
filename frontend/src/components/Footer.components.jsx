import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate=useNavigate()
  return (
    <div className='md:mx-10 mt-16'>
        <hr />
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm '>
            {/*-----Left section-------*/}
            <div>
                <div className='flex items-center gap-2 mb-5 cursor-pointer' onClick={() => {navigate('/'); scrollTo(0,0)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v5.25H6a.75.75 0 000 1.5h5.25V18a.75.75 0 001.5 0v-5.25H18a.75.75 0 000-1.5h-5.25V6z" clipRule="evenodd" />
                    </svg>
                    <span className='text-2xl font-bold text-gray-800 tracking-tight'>
                        Medi<span className='text-primary'>Connect</span>
                    </span>
                </div>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>MediConnect is an innovative platform connecting patients with trusted doctors. It simplifies appointment booking, offers personalized health management tools, and ensures secure access to healthcare. With features like digital records, and reminders, MediConnect makes healthcare convenient and efficient to your needs.</p>
            </div>

            {/*-----Center section-------*/}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li className='cursor-pointer hover:text-gray-700 hover:scale-105 transition-all'onClick={()=> {navigate('/');scrollTo(0,0)}}>Home</li>
                    <li className='cursor-pointer hover:text-gray-700 hover:scale-105 transition-all'onClick={()=> {navigate('/about');scrollTo(0,0)}}>About us</li>
                    <li className='cursor-pointer hover:text-gray-700 hover:scale-105 transition-all'onClick={()=> {navigate('contact');scrollTo(0,0)}}>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/*-----Right section-------*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 9999999999</li>
                    <li>xyz@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            {/*-------Copyright text-----*/}
            <hr className='h-0.5 bg-gray-200' />
            <p className='py-5 text-swm text-center'>Copyright 2026@ MediConnect - All Right Reserved. </p>
        </div>
    </div>
  )
}

export default Footer