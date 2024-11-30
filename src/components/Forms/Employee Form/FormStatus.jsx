import React from 'react'
import { useSelector } from 'react-redux'

const FormStatus = ({formState}) => {
  const Theme = useSelector((state)=>state.Theme.theme)
  return (
    <div className={`w-full  h-full p-2 flex translate-x-[-10px] justify-center items-center `}>
      <div className='flex flex-col  items-center relative'>
      <div className={`border  flex justify-center items-center p-5 h-4 w-4 rounded-full ${formState>=1? Theme=="Dark" ?"bg-slate-500" :"bg-black" : "bg-slate-500"}  text-white`}>1</div>
      <p className='absolute mt-11'>Primary</p>
      </div>

      <div className={`w-40 border border-dashed ${formState>1?"border-yellow-600": Theme=="Dark" ? "border-slate-200"  : "border-black" }  h-0`}></div>


     <div className='flex flex-col  items-center relative'>
     <div className={`border flex justify-center items-center p-5 h-4 w-4 rounded-full ${formState>=2?Theme=="Dark" ? "bg-slate-500 text-white" :"bg-black text-white": Theme=="Dark" ? "bg-slate-300 text-black" : "bg-slate-500 text-white"} `}>2</div>
     <p className=' absolute mt-11 w-36 translate-x-4'>Personal Details</p>
     </div>

     <div className={`w-40 border border-dashed ${formState>2?"border-yellow-600": Theme=="Dark" ? "border-slate-200"  : "border-black"}  h-0`}></div>
      <div className='flex flex-col  items-center relative'>
      <div className={`border  flex justify-center items-center p-5 h-4 w-4 rounded-full ${formState==3?Theme=="Dark" ? "bg-slate-500 text-white" :"bg-black text-white": Theme=="Dark" ? "bg-slate-300 text-black" : "bg-slate-500 text-white"} `}>3</div>
      <p className=' absolute mt-11   w-36 translate-x-4'>Additional Details</p>
      </div>
    </div>
  )
}

export default FormStatus
