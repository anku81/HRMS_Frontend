import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrganizations } from '../../../services/operations/AsideBar'
import { assignBranchToDepartment, assignOrganizationToDepartment, deleteDepartment, getDepartmentsByOrganization, getUnassignedDepartments, removeBranchFromDepartment, removeOrganizationFromDepartment } from '../../../services/operations/Department'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { getEmployeeById } from '../../../services/operations/Employee';
import Modal from '../../../components/common/Modal';

const DepartmentList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state)=>state.Aside.filteredDepartments)
  const organizationData = useSelector((state)=>state.Aside.organizations)
  const manager = useSelector((state)=>state.Aside.employees)
  const [organizationId,setOrganizationId]= useState("unAssigned")
  const [modal,setModal] = useState(false)
  const [departmentId,setDepartmentId]= useState('undefined')
  const [isSuborg,setIsSuborg] = useState(false)
  const isLastPage = useSelector((state)=>state.Aside.isLastDep)
const [page,setPage] = useState(1)

  useEffect(()=>{
  
      dispatch(getOrganizations("All"))

      dispatch(getUnassignedDepartments())

  },[])
  // useEffect(()=>{
  //     dispatch(getSubOrganizationsByOrganizations(organizationId))
  // },[organizationId])
  console.log("organizationId=====>>>>>.",organizationId)
  function deleteHandler(id){
    console.log(id)
    dispatch(deleteDepartment(id))
  
      }
  async function editHandler(data){
   console.log(data)
    const newData = {...data}
    console.log("newDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewDatanewData",newData)
    await dispatch(getEmployeeById(data.manager))
    newData.manager = manager?.personalDetails?.firstName+" "+manager?.personalDetails?.lastName
    console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM",newData.manager)
    navigate("/home/Create-Department",{state : {preFilled : newData }})
      }

      function assignOrganization(departmentId,organizationId)
      {
        dispatch(assignOrganizationToDepartment(departmentId,organizationId))
      }
      function assignSubOrganization(departmentId,branchId)
      {
        dispatch(assignBranchToDepartment(departmentId,branchId))
      }
      function removeOrganization(departmentId,organizationId){
        dispatch(removeOrganizationFromDepartment(departmentId,organizationId))
      }
      function removeBranch(departmentId,branchId){
        dispatch(removeBranchFromDepartment(departmentId,branchId))
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
     
        <td>{item.manager}</td>
        <td>{item.description}</td>
        <td>{item.Organization ? <button onClick={(e)=>{
          e.preventDefault()
         
          removeOrganization(item._id,item.Organization)
        }} className='bg-yellow-300 p-2'>UnAssign</button>:<button onClick={(e)=>{
          console.log(item)
          setIsSuborg(false)
          setDepartmentId(item._id)
          setModal(true)
        }} className='bg-yellow-300 p-2'>Assign</button>}</td>

        <td>{item.branch ? <button  onClick={(e)=>{
          e.preventDefault()
          removeBranch(item._id,item.branch)
        }}  className='bg-yellow-300 p-2'>UnAssign</button>:<button  onClick={(e)=>{
          setIsSuborg(true)
          setDepartmentId(item._id)
          
          setModal(true)
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
        parent = {"Department"}
        setModal={setModal}
        organizationId={organizationId}
        departmentId={departmentId}
        assignOrganization={assignOrganization}
        assignSubOrganization={assignSubOrganization}
        isSuborg = {isSuborg}
        // unAssignOrganization={unAssignOrganization}
        setOrganizationId={setOrganizationId}
        />
      }

<div className='flex justify-between'>

<button
onClick={(e)=>{
 e.preventDefault()

 
page >0  && organizationId !=="unAssigned" ? dispatch(getDepartmentsByOrganization(organizationId,page-1)) : dispatch(getUnassignedDepartments(page-1))
setPage(page-1)

 console.log("HHHH")
}} 
disabled={page==1}


className={`bg-red-400 p-3 rounded-md ${page==1  ? "opacity-60" : ""}`}>Previous</button>


<button onClick={(e)=>{
 e.preventDefault()

 
page >0  && !isLastPage &&  organizationId !=="unAssigned" ? dispatch(getDepartmentsByOrganization(organizationId,page+1))  : dispatch(getUnassignedDepartments(page+1))
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

export default DepartmentList
