import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrganizations } from '../../../services/operations/AsideBar'
import { getDepartmentsByOrganization, getUnassignedDepartments } from '../../../services/operations/Department'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const DepartmentList = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=>state.Aside.filteredDepartments)
  const organizationData = useSelector((state)=>state.Aside.organizations)
  
  const [organizationId,setOrganizationId]= useState("unAssigned")
  useEffect(()=>{
  
      dispatch(getOrganizations())
      dispatch(getUnassignedDepartments())

  },[])
  // useEffect(()=>{
  //     dispatch(getSubOrganizationsByOrganizations(organizationId))
  // },[organizationId])
  console.log("organizationId=====>>>>>.",organizationId)
  function deleteHandler(id){
    console.log(id)
      }
      function editHandler(){
    
      }
return (
  <div className='p-5 '>

      <div >
          <select onChange={(e)=>{
              e.preventDefault()
              setOrganizationId(e.target.value)
              if(e.target.value=="unAssigned")
              {
                  dispatch(getUnassignedDepartments())
                  console.log("Changed========>",e.target.value)
              
              }
            else{
              dispatch(getDepartmentsByOrganization(e.target.value))
            }
              
          }}>
              <option value={"unAssigned"}>Unassigned Departments</option>
              {
                  organizationData && organizationData.map((item)=><option value={item?._id}>{item.name}</option>)
              }
          </select>
      </div>



   <div className='border rounded-lg overflow-hidden'>
   <table className='w-full'>
      <thead className='w-full text-left '>
     <tr className='bg-slate-400'>
     <th className='p-3'>Department Name</th>
      <th>Department Manager</th>
      <th>Department Description</th>
      <th>Organization</th>
      <th>Sub Organization</th>
      <th>Action</th>
     </tr>
    </thead>
<tbody>
{
      data && data.map((item,index)=>(<tr className={`h-full ${index%2==0 ? "bg-zinc-200" : ""}`}>

        <td className='p-5'>{item.name}</td>
     
        <td>{item.name}</td>
        <td>{item.name}</td>
        <td>{item.organization ? <button className='bg-yellow-300 p-2'>UnAssign</button>:<button className='bg-yellow-300 p-2'>Assign</button>}</td>
        <td>{item.branch ? <button className='bg-yellow-300 p-2'>UnAssign</button>:<button className='bg-yellow-300 p-2'>Assign</button>}</td>

        <td >
        <div className='flex items-center gap-3'>
        <FiEdit 
        onClick={editHandler}
        />
        <MdDelete
        onClick={()=>deleteHandler(item._id)}
        />
        </div>
        </td>
      </tr>))
     }
</tbody>
      </table>
   </div>
  </div>
)
}

export default DepartmentList
