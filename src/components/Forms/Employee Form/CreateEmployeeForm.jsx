import React, { useEffect } from 'react'
import { RiInputField } from 'react-icons/ri'
import InputField from '../../common/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import {getOrganizations} from '../../../services/operations/AsideBar'
import {getAllRoles} from '../../../services/operations/Roles'

const CreateEmployeeForm = () => {
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

  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>

      <div>
          <label htmlFor="organizationId">Select a organization</label>

          <select id="organizationId" {...register("organizationId", { required: true })}>
          <option value="">--Select--</option>
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
   <div>
          <label htmlFor="roleId">Select a Role</label>
          
          <select id="roleId" {...register("roleId", { required: true })}>
          <option value="">--Select--</option>
          {
          RoleList && RoleList.map((item)=>  <option value={item._id}>{item.title}</option>)
          }
             
            
            
          </select>
          {errors.organizationId && <p>This field is required</p>}
      </div>
          <button>Submit</button>
      </form>
    </div>
  )
}

export default CreateEmployeeForm
