import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDepartments } from '../../../services/operations/Department';
import { getAllEmployees, getEmployeesByDepartment } from '../../../services/operations/Employee';
const EmployeeList = () => {
  const dispatch = useDispatch()
  const data = useSelector((state)=>state.Aside.filteredEmployees)
  const departmentData = useSelector((state)=>state.Aside.departments)
  
  const [departmentId,setDepartmentId]= useState("All")
  useEffect(()=>{
      dispatch(getAllDepartments())
      dispatch(getAllEmployees())
      // dispatch(getSubOrganizationsByOrganizations(departmentId))
  //    dispatch(getSubOrganizations())
  },[])
  // useEffect(()=>{
  //     dispatch(getSubOrganizationsByOrganizations(departmentId))
  // },[departmentId])
  console.log("departmentIIIId=====>>>>>.",departmentId )

  function deleteHandler(id){
console.log(id)
  }
  function editHandler(){
    
  }
return (
  <div className='p-5'>

      <div>
          <select onChange={(e)=>{
              e.preventDefault()
               setDepartmentId(e.target.value)
              console.log("Changed========>",e.target.value)
              if(e.target.value=="All")
              {
                  dispatch(getAllEmployees())
                  console.log("Changed========>",e.target.value)
              
              }
            else{
              dispatch(getEmployeesByDepartment(e.target.value))
            }
              
          }}>
              <option value={"All"}>All Employees</option>
              {
                  departmentData && departmentData.map((item)=><option value={item?._id}>{item.name}</option>)
              }
          </select>
      </div>



   <div className='border rounded-lg overflow-hidden'>
   <table className='w-full'>
      <thead className='w-full text-left '>
     <tr className='bg-slate-400'>
     <th className='p-3'>Avatar</th>
      <th>Employee Name</th>
      <th>Employee Email</th>
      <th>Employee Code</th>
      <th>Department</th>
      <th>Action</th>
     </tr>
    </thead>
<tbody>
{
      (data && data.length>0) && data.map((item,index)=>(<tr className={`h-full ${index%2==0 ? "bg-zinc-200" : ""}`}>

        <td className='p-5'>{item._id}</td>
     
        <td>{item?.personalDetails?.firstName + " "+ item?.personalDetails?.lastName} </td>
        <td>{item?.email}</td>
        <td>{item?.personalDetails?.employeeCode}</td>
        <td>{item?.organization ? <button className='bg-yellow-300 p-2'>UnAssign</button> :<button className='bg-yellow-300 p-2'>Assign</button>}</td>
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

export default EmployeeList
