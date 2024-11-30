import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { deleteRole, getAllRoles } from '../../../services/operations/Roles';
import { useNavigate } from 'react-router-dom';
const RoleList = () => {
  const Theme = useSelector((state)=>state.Theme.theme)
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
    <div className={`w-full p-5 border rounded-lg  ${Theme=="Dark" ? "bg-slate-800 text-white" : "bg-slate-100"}`}>
<div className='flex justify-between font-bold w-full'>
           <p>{location.pathname.split("/").at(-1).replaceAll("-"," ")}</p>
           <p>Home/<span className='text-yellow-600'>{location.pathname.split("/").at(-1).replaceAll("-"," ")}</span></p>
           </div>

      <button 
      onClick={()=>navigate("/home/Create-Sub-Organization")}
      className="p-2 bg-red-500 mt-7 rounded text-white ">Add Sub Organization</button>

    <div className='border rounded-lg overflow-hidden mt-9'>
    <table className='w-full'>
     <thead className='w-full text-left '>
      <tr className={`${Theme=="Dark" ? "bg-slate-600 text-white" : "bg-slate-400"}`}>
      <th className='p-3'>S No.</th>
       <th>Role</th>
 
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
     {
       data && data.map((item,index)=>(<tr className={`h-full ${index%2==0 ? Theme=="Dark" ? "bg-zinc-500" : "bg-zinc-200" : ""}`}>

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
