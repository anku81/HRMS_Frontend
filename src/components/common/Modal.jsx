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
    <div className=' h-full bg-transparent z-50 fixed top-0 left-0 right-0 border backdrop-blur-sm flex justify-center items-center  '>
        
         {
         
           <div className='flex flex-col opacity-100 bg-white p-9 rounded-3xl'>
            <h1 className='mx-auto mb-7 text-2xl'>Assign {parent=="Employee" ? "Department" : parent=="subOrganization" ? "Organization" : parent=="Department" && isSuborg ? "Branch" : "Organization"} </h1>
          {/* <label htmlFor="organizationId">{isSuborg ? "Select a branch" : "Select a organization" }</label> */}
          <select 
                           className={`appearance-none w-full min-w-72 max-w-96 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto `}

          onClick={(e)=>{
          
          { (parent=="subOrganization" &&  e.target.value!=="") && assignOrganization(branchId,e.target.value)}
         {  (parent=="Department"&& !isSuborg &&   e.target.value!=="") && assignOrganization(departmentId,e.target.value)}
          { (parent=="Department" && isSuborg &&  e.target.value!=="") && assignSubOrganization(departmentId,e.target.value)}
          {  (parent=="Employee"&&   e.target.value!=="") && assignDepartment(userId,e.target.value)}
            e.target.value!=="" && setModal(false)
          }}
          id="organizationId">
          <option value=""> Select {parent=="Employee" ? "Department" : parent=="subOrganization" ? "Organization" : parent=="Department" && isSuborg ? "Branch" : "Organization"}</option>
          {
          data && data.map((item)=>  <option  value={item._id}>{item.name}</option>)
          }
             
             
            
          </select>
          {/* {errors.organizationId && <p>This field is required</p>} */}

          <button
          onClick={()=>setModal(false)}
          >Cancel</button>
      </div>
        }
    </div>
  )
}

export default Modal
