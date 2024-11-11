import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubOrganizations } from '../../services/operations/AsideBar'

const Modal = ({setModal,organizationId,branchId,assignOrganization,setOrganizationId,parent,departmentId,assignSubOrganization, isSuborg,userId,assignDepartment}) => {
  console.log(userId) 
  const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getSubOrganizations())
    },[])
    const data = parent=="Employee"? useSelector((state)=>state.Aside.departments) :(!isSuborg ?  useSelector((state)=>state.Aside.organizations) : useSelector((state)=>state.Aside.subOrganizations))
 
    console.log(data,isSuborg)
  return (
    <div className='w-screen h-screen fixed backdrop-blur-sm flex  '>
        
         {
         
           <div className='flex flex-col opacity-100'>
          <label htmlFor="organizationId">{isSuborg ? "Select a branch" : "Select a organization" }</label>
          <select 
          onClick={(e)=>{
          
          { (parent=="subOrganization" &&  e.target.value!=="") && assignOrganization(branchId,e.target.value)}
         {  (parent=="Department"&& !isSuborg &&   e.target.value!=="") && assignOrganization(departmentId,e.target.value)}
          { (parent=="Department" && isSuborg &&  e.target.value!=="") && assignSubOrganization(departmentId,e.target.value)}
          {  (parent=="Employee"&&   e.target.value!=="") && assignDepartment(userId,e.target.value)}
            e.target.value!=="" && setModal(false)
          }}
          id="organizationId">
          <option value="">--Select--</option>
          {
          data && data.map((item)=>  <option  value={item._id}>{item.name}</option>)
          }
             
             
            
          </select>
          {/* {errors.organizationId && <p>This field is required</p>} */}
      </div>
        }
    </div>
  )
}

export default Modal
