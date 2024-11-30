import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addAttribute } from '../../services/operations/Attribute';
import { useLocation } from 'react-router-dom';
const ManageAttributes = ({parent}) => {
  const Theme = useSelector((state)=>state.Theme.theme)
    const dispatch= useDispatch()
  

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
  return (
    <div className=''>
         <form 
         className='flex gap-3 '
         onSubmit={handleSubmit((data) => dispatch(addAttribute(data.title,parent)))}>
                  
                 <div>
                 <input 
                   type='text'
                   placeholder='Attribute Title'
                      className={`min-w-72 p-2 border ${Theme=="Dark" ? "bg-slate-800 border-slate-500" : ""} ${errors.title ? "border-red-500" :  "border-gray-400"} rounded`}
                   
                    {...register('title', { required: true })} />
                    {errors.title && <p className='text-red-500'>Title is required.</p>}
                 </div>
           
                   <div>
                   <button
                  className='cursor-pointer bg-black text-white px-4 py-2 rounded mt-2 translate-y-[-7px]'
                      htmlFor='title'>Add</button>
                   </div>


                       </form>
    </div>
  )
}

export default ManageAttributes
