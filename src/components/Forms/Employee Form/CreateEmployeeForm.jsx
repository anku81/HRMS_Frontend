import React, { useEffect } from 'react'
import { RiInputField } from 'react-icons/ri'
import InputField from '../../common/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import {getOrganizations} from '../../../services/operations/AsideBar'
import {getAllRoles} from '../../../services/operations/Roles'
import { addEmployee } from '../../../services/operations/Employee';
import SubmitButton from '../../common/SubmitButton';

const CreateEmployeeForm = ({setUserId,setFormState}) => {
  const Theme = useSelector((state)=>state.Theme.theme)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getAllRoles())
      dispatch(getOrganizations())
    },[])
    const OrganizationList = useSelector((state)=>state.Aside.organizations)
    const RoleList = useSelector((state)=>state.Aside.roles)
console.log(OrganizationList)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

const submissionHandler = (email,password,organization,roleId)=>{
   dispatch(addEmployee(email,password,organization,roleId,setUserId,setFormState))
  // setUserId(userId)
  // setFormState(2)
  
}

  return (
    <div className='  w-1/2 '>
      <form 
      className=' w-96  mx-auto'
      onSubmit={handleSubmit((data) =>submissionHandler(data.email,data.password,data.organizationId,data.roleId) )}>

      <div className='flex flex-col   max-w-96'>
          <label htmlFor="organizationId">Select a organization</label>

          <select id="organizationId"
          // className='appearance-none'
          className={` appearance-none w-full min-w-72 max-w-96 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto ${Theme=="Dark" ? "bg-slate-800 text-white" : "bg-slate-100"} `}

          {...register("organizationId", { required: true })}>
          <option value="">Select Organization</option>
          {
          OrganizationList && OrganizationList.map((item)=>  <option value={item._id}>{item.name}</option>)
          }
             
            
            
          </select>
          {errors.organizationId && <p>This field is required</p>}
      </div>
       
       <InputField
       type={`email`}
       label={`Email Address`}
       placeholder={`Enter Your Email`}
       {...register('email', { required: true })}
       />

<InputField
type={`password`}
       label={`Password`}
       placeholder={`Enter Your Password`}
       {...register('password', { required: true })}
       />
   <div className='flex flex-col   max-w-96'>
          <label htmlFor="roleId">Select a Role</label>
          
          <select
                    className={`appearance-none w-full min-w-72 max-w-96 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto ${Theme=="Dark" ? "bg-slate-800 text-white" : "bg-slate-100"} `}

          id="roleId" {...register("roleId", { required: true })}>
          <option value="">Select a Role</option>
          {
          RoleList && RoleList.map((item)=>  <option value={item._id}>{item.title}</option>)
          }
             
            
            
          </select>
          {errors.organizationId && <p>This field is required</p>}
      </div>
      <div className='flex justify-center  my-5'>
      <SubmitButton
      buttonText={"Submit"}
      />
      </div>
        
      </form>
    </div>
  )
}

export default CreateEmployeeForm
