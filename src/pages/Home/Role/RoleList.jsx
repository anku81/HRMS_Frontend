import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { deleteRole, getAllRoles } from '../../../services/operations/Roles';
import { useNavigate } from 'react-router-dom';
const RoleList = () => {
  const data = useSelector((state)=>state.Aside.roles)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(getAllRoles())
  },[])

  function deleteHandler(roleId){
  
    dispatch(deleteRole(roleId))
      }
      function editHandler(data){
        navigate("/home/Create-Role",{state : {preFilled : data}})
      }
  return (
    <div className='w-full p-5 border rounded-lg'>
    <div className='border rounded-lg overflow-hidden'>
    <table className='w-full'>
     <thead className='w-full text-left '>
      <tr className='bg-slate-400'>
      <th className='p-3'>S No.</th>
       <th>Role</th>
 
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
     {
       data && data.map((item,index)=>(<tr className={`h-full ${index%2==0 ? "bg-zinc-200" : ""}`}>

         <td className='p-5'>{index+1}</td>
      
         <td>{item.title}</td>
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
   </div>
  )
}

export default RoleList
