import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrganizations, getSubOrganizations, getSubOrganizationsByOrganizations, getUnassignedSubOrganizations } from '../../../services/operations/AsideBar'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { deleteSubOrganization } from '../../../services/operations/SubOrganization';
import { useNavigate } from 'react-router-dom';
const SubOrganizationList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector((state)=>state.Aside.filteredSubOrganizations)
    const organizationData = useSelector((state)=>state.Aside.organizations)
    
    const [organizationId,setOrganizationId]= useState("unAssigned")
    useEffect(()=>{
        dispatch(getOrganizations())
        dispatch(getUnassignedSubOrganizations())
        // dispatch(getSubOrganizationsByOrganizations(organizationId))
    //    dispatch(getSubOrganizations())
    },[])
    // useEffect(()=>{
    //     dispatch(getSubOrganizationsByOrganizations(organizationId))
    // },[organizationId])
    console.log("organizationId=====>>>>>.",organizationId)

    function deleteHandler(orgId,id){
        console.log(id)
        dispatch(deleteSubOrganization(orgId,id))
          }
function editHandler(data){
    // console.log("{{{{{{{{{{{{{{{{{",data)
    navigate("/home/Create-Sub-Organization",{state : {preFilled : data }})
          }
    
  return (
    <div className='p-5'>

        <div>
            <select onChange={(e)=>{
                e.preventDefault()
                setOrganizationId(e.target.value)
                if(e.target.value=="unAssigned")
                {
                    dispatch(getUnassignedSubOrganizations())
                    console.log("Changed========>",e.target.value)
                
                }
              else{
                dispatch(getSubOrganizationsByOrganizations(e.target.value))
              }
                
            }}>
                <option value={"unAssigned"}>Unassigned Sub Organization</option>
                {
                    organizationData && organizationData.map((item)=><option value={item?._id}>{item.name}</option>)
                }
            </select>
        </div>



     <div className='border rounded-lg overflow-hidden'>
     <table className='w-full'>
        <thead className='w-full text-left '>
       <tr className='bg-slate-400'>
       <th className='p-3'>Sub Organization Id</th>
        <th>Sub Organization Name</th>
        <th>Assign Organization</th>
        <th>Action</th>
       </tr>
      </thead>
  <tbody>
  {
        data && data.map((item,index)=>(<tr className={`h-full ${index%2==0 ? "bg-zinc-200" : ""}`}>

          <td className='p-5'>{item._id}</td>
       
          <td>{item.name}</td>
          <td>{item.organization ? item.organization :<button className='bg-yellow-300 p-2'>Assign</button>}</td>
          <td >
          <div className='flex items-center gap-3'>
          <FiEdit 
        onClick={()=>editHandler(item)}
        />
        <MdDelete
        onClick={()=>deleteHandler(item.organization,item._id)}
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

export default SubOrganizationList
