import React from 'react'

const FormStatus = ({formState}) => {
  return (
    <div className=' h-full p-2 flex items-center'>
      <div className='flex flex-col  items-center'>
      <div className={`border  flex justify-center items-center p-4 h-4 w-4 rounded-full ${formState>=1?"bg-black": "bg-slate-500"}  text-white`}>1</div>
      <p className='absolute mt-9'>Primary</p>
      </div>

      <div className={`w-32 border border-dashed ${formState>1?"border-yellow-600": "border-black"}  h-0`}></div>


     <div className='flex flex-col  items-center'>
     <div className={`border flex justify-center items-center p-4 h-4 w-4 rounded-full ${formState>=2?"bg-black": "bg-slate-500"} text-white`}>2</div>
     <p className=' absolute mt-9'>Personal Details</p>
     </div>

     <div className={`w-32 border border-dashed ${formState>2?"border-yellow-600": "border-black"}  h-0`}></div>
      <div className='flex flex-col  items-center'>
      <div className={`border  flex justify-center items-center p-4 h-4 w-4 rounded-full ${formState==3?"bg-black": "bg-slate-500"} text-white`}>3</div>
      <p className=' absolute mt-9'>Additional Details</p>
      </div>
    </div>
  )
}

export default FormStatus
