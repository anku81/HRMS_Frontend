import React, { useEffect, useState } from 'react'
import { getOrganizations } from '../../../services/operations/AsideBar'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrganization } from '../../../services/operations/Organization';
import { useNavigate } from 'react-router-dom';

const OrganizationList = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const data = useSelector((state)=>state.Aside.organizations)
const isLastPage = useSelector((state)=>state.Aside.isLastOrg)
const [page,setPage] = useState(1)
// const [limit,setLimit] = useState(2)
  useEffect(()=>{
   
   dispatch(getOrganizations())
  },[])

  console.log("OrganizationList==========>>>>>>>",data)
  function deleteHandler(id){
    console.log(id)
    dispatch(deleteOrganization(id))
    
      }
 function editHandler(data){
  navigate("/home/Create-Organization",{state : {preFilled : data }})
      }
  return (
    <div className='w-full p-5 border rounded-lg'>
     <div className='border rounded-lg overflow-hidden'>
     <table className='w-full'>
      <thead className='w-full text-left '>
       <tr className='bg-slate-400'>
       <th className='p-3'>S No.</th>
        <th>Organization Logo</th>
        <th>Organization Name</th>
        <th>Organization Description</th>
        <th>Action</th>
       </tr>
      </thead>
      <tbody>
      {
        data && data.map((item,index)=>(<tr className={`h-full ${index%2==0 ? "bg-zinc-200" : ""}`}>

          <td className='p-5'>{index+1}</td>
          <td >
            <img
            className='w-[40px] h-[40px] object-cover border border-black rounded-full'
           
            src={item.logo} ></img></td>
          <td>{item.name}</td>
          <td>{item.description.substring(0,20)}...</td>
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
   <div className='flex justify-between'>

   <button
   onClick={(e)=>{
    e.preventDefault()
  
    
  page >0  && dispatch(getOrganizations(page-1))
   setPage(page-1)

    console.log("HHHH")
   }} 
   disabled={page==1}


   className={`bg-red-400 p-3 rounded-md ${page==1  ? "opacity-60" : ""}`}>Previous</button>


   <button onClick={(e)=>{
    e.preventDefault()
  
    
  page >0  && !isLastPage && dispatch(getOrganizations(page+1)) 
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

export default OrganizationList
