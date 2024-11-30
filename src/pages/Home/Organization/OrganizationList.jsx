import React, { useEffect, useState } from 'react'
import { getOrganizations } from '../../../services/operations/AsideBar'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrganization } from '../../../services/operations/Organization';
import { useNavigate } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
const OrganizationList = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
const Theme = useSelector((state)=>state.Theme.theme)
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
    <div className={`w-full p-5 border rounded-lg ${Theme=="Dark" ? "bg-slate-800 text-white" : "bg-slate-100"}`}>
       <div className='flex justify-between text-xl font-bold w-full'>
           <p>{location.pathname.split("/").at(-1).replaceAll("-"," ")}</p>
           <p>Home / <span className='text-yellow-600'>{location.pathname.split("/").at(-1).replaceAll("-"," ")}</span></p>
           </div>

      <button 
      onClick={()=>navigate("/home/Create-Organization")}
      className="p-2 bg-red-500 mt-7 rounded text-white flex items-center gap-2"><IoAddCircleOutline />Add Organization</button>
     <div className='border rounded-lg overflow-hidden mt-10 mb-7'>
     <table className='w-full'>
      <thead className='w-full text-left '>
       <tr className={ `w-full p-5 border rounded-lg ${Theme=="Dark" ? "bg-slate-600 text-white" : "bg-slate-400"}`}>
       <th className='p-3'>S No.</th>
        <th>Organization Logo</th>
        <th>Organization Name</th>
        <th>Organization Description</th>
        <th>Action</th>
       </tr>
      </thead>
      <tbody>
      {
        data && data.map((item,index)=>(<tr className={`h-full ${index%2==0 ?Theme=="Dark" ? "bg-zinc-500 text-white" : "bg-zinc-200"  : ""}`}>

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
          className='text-blue-500 '
        onClick={()=>editHandler(item)}
        />
        <MdDelete
        className=' text-red-500'
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
