import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getAllDepartments } from '../../../services/operations/Department';
import { assignDepartmentToEmployee, deleteEmployee, getAllEmployees, getEmployeesByDepartment, removeDepartmentFromEmployee } from '../../../services/operations/Employee';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/common/Modal';
const EmployeeList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state)=>state.Aside.filteredEmployees)
  const departmentData = useSelector((state)=>state.Aside.departments)
  const [modal,setModal] = useState(false)
  const [userId,setUserId] = useState("")

  const isLastPage = useSelector((state)=>state.Aside.isLastEmp)
  const [page,setPage] = useState(1)

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

  function deleteHandler(userId){
    console.log(userId)
dispatch(deleteEmployee(userId))
  }
  function editHandler(data){
    console.log(data)
    navigate("/home/Create-Employee",{state : {preFilled : data}})
  }
  function assignDepartment(userId,departmentId){
    dispatch(assignDepartmentToEmployee(userId,departmentId))
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

        {/* <td className='p-5'></td> */}
       <td> <img 
        className='w-14 h-14 object-cover rounded-full m-1 border border-black'
        src={item.personalDetails?.profilePicture}></img></td>
     
        <td>{item?.personalDetails?.firstName + " "+ item?.personalDetails?.lastName} </td>
        <td>{item?.email}</td>
        <td>{item?.personalDetails?.employeeCode}</td>
        <td>{item?.personalDetails?.department ? <button onClick={()=>dispatch(removeDepartmentFromEmployee(item?._id,item?.personalDetails?.department))} className='bg-yellow-300 p-2'>UnAssign</button>
         : <button onClick={(e)=>{
          e.preventDefault()
          setModal(true)
          setUserId(item?._id)
         
        }} className='bg-yellow-300 p-2'>Assign</button>}</td>
        <td >
        <div className='flex items-center gap-3'>
        <FiEdit 
        onClick={()=>editHandler(item)}
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

   {
        modal && <Modal 
        parent = {"Employee"}
        setModal={setModal}
    
       
        userId={userId}
        departmentId={departmentId}
      
        // unAssignOrganization={unAssignOrganization}
 
        assignDepartment={assignDepartment}
        />
      }

<div className='flex justify-between'>

<button
onClick={(e)=>{
 e.preventDefault()

 
page >0  && departmentId !=="All" ? dispatch(getEmployeesByDepartment(departmentId,page-1)) : dispatch(getAllEmployees(page-1))
setPage(page-1)

 console.log("HHHH")
}} 
disabled={page==1}


className={`bg-red-400 p-3 rounded-md ${page==1  ? "opacity-60" : ""}`}>Previous</button>


<button onClick={(e)=>{
 e.preventDefault()

 
page >0  && !isLastPage &&  departmentId !=="All" ? dispatch(getEmployeesByDepartment(departmentId,page+1))  : dispatch(getAllEmployees(page+1))
setPage(page+1)

 console.log("HHHH",isLastPage)
}} 
disabled={ isLastPage}
//  Complete This logic if on last page data.length=limit
className={`bg-red-400 p-3 rounded-md ${ isLastPage ? "opacity-60" : ""}`}>Next</button>
</div>
  </div>
)
}

export default EmployeeList
