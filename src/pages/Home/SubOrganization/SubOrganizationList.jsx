import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrganizations, getSubOrganizations, getSubOrganizationsByOrganizations, getUnassignedSubOrganizations } from '../../../services/operations/AsideBar'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { assignOrganizationToSubOrganization, deleteSubOrganization, removeOrganizationFromSubOrganization } from '../../../services/operations/SubOrganization';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/common/Modal';
const SubOrganizationList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector((state)=>state.Aside.filteredSubOrganizations)
    const organizationData = useSelector((state)=>state.Aside.organizations)
    
    const [organizationId,setOrganizationId]= useState("unAssigned")
    const [branchId,setBranchId]= useState('undefined')
    const [modal,setModal] = useState(false)
    const isLastPage = useSelector((state)=>state.Aside.isLastSubOrg)
const [page,setPage] = useState(1)

    useEffect(()=>{
        dispatch(getOrganizations("All"))
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
    
function assignOrganization(branchId,organizationId){
 
  dispatch(assignOrganizationToSubOrganization(branchId,organizationId))
}
function unAssignOrganization(branchId,organizationId){
  dispatch(removeOrganizationFromSubOrganization(branchId,organizationId))
}
console.log(isLastPage)
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
          <td>{item.Organization ? <button onClick={()=>{
            console.log(item._id,item.Organization)
            unAssignOrganization(item._id,item.Organization)
          }} className='bg-yellow-300 p-2'>UnAssign</button> :<button onClick={(e)=>{

            e.preventDefault()
setBranchId(item._id)
setModal(true)
          }} className='bg-yellow-300 p-2'>Assign</button>}</td>
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

     {
        modal && <Modal 
        parent = {"subOrganization"}
        setModal={setModal}
        organizationId={organizationId}
        branchId={branchId}
        assignOrganization={assignOrganization}
        // unAssignOrganization={unAssignOrganization}
        setOrganizationId={setOrganizationId}
        />
      }

<div className='flex justify-between'>

<button
onClick={(e)=>{
 e.preventDefault()

 
page >0  && (organizationId!=="unAssigned" ?dispatch(getSubOrganizationsByOrganizations(organizationId,page-1)) : dispatch(getUnassignedSubOrganizations(page-1)) )
setPage(page-1)

 console.log("HHHH")
}} 
disabled={page==1}


className={`bg-red-400 p-3 rounded-md ${page==1  ? "opacity-60" : ""}`}>Previous</button>


<button onClick={(e)=>{
 e.preventDefault()

 
page >0 && !isLastPage && (organizationId!=="unAssigned" ? dispatch(getSubOrganizationsByOrganizations(organizationId,page+1)) : dispatch(getUnassignedSubOrganizations(page+1)))
setPage(page+1)

 console.log("HHHH",isLastPage)
}} 
disabled={isLastPage}
//  Complete This logic if on last page data.length=limit
className={`bg-red-400 p-3 rounded-md ${isLastPage ? "opacity-60" : ""}`}>Next</button>
</div>
    </div>
  )
}

export default SubOrganizationList
