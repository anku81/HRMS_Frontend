import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../../common/InputField';
import AttributeList from '../AttributeList';
const PersonalDetailsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [manageAttribute,setManageAttribute] =useState(false)

  return (
    <div className='flex justify-center'>
   <form className='w-[80%] justify-center'>
   <div className='flex flex-col '>
      



       
   </div>
   </form>

 
    </div>
  )
}

export default PersonalDetailsForm
