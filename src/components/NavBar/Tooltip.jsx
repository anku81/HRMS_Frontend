import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import { VscDashboard } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { setLoggedIn } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
const Tooltip = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  return (
    <div className='absolute  top-8 right-7  w-1/6 flex flex-col items-center  '>
    <div className=' w-7 h-7 bg-slate-300 rotate-45 translate-y-6 -z-20'></div>
    <div className=' bg-slate-300 p-3 w-full rounded-lg flex flex-col items-start justify-center'>
      <p className='flex gap-2 items-center'><VscDashboard />DashBoard</p>
      <p 
      onClick={(e)=>{
        e.preventDefault()
        localStorage.clear()
        dispatch(setLoggedIn(false))
        navigate("/login")
      }}
      className='flex gap-2 items-center'><IoLogOutOutline />Log Out</p>
      </div>
    </div>
  )
}

export default Tooltip
