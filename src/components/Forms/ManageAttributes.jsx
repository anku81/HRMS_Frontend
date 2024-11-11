import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAttribute } from '../../services/operations/Attribute';
import { useLocation } from 'react-router-dom';
const ManageAttributes = ({parent}) => {
    const dispatch= useDispatch()
  

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
  return (
    <div>
         <form onSubmit={handleSubmit((data) => dispatch(addAttribute(data.title,parent)))}>
                  
                  <input 
                   type='text'
                      className=' max-w-72 p-2 border border-gray-400 rounded'
                   
                    {...register('title', { required: true })} />
                    {errors.title && <p>title is required.</p>}
           
                    <button
                  className='cursor-pointer bg-black text-white px-4 py-2 rounded mt-2'
                      htmlFor='title'>Add</button>
                       </form>
    </div>
  )
}

export default ManageAttributes
