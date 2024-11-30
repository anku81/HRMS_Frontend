import React, { useEffect, useState } from 'react'
import CreateEmployeeForm from '../../../components/Forms/Employee Form/CreateEmployeeForm'
import FormStatus from '../../../components/Forms/Employee Form/FormStatus'
import PersonalDetailsForm from '../../../components/Forms/Employee Form/PersonalDetailsForm'
import AdditionalDetailsForm from '../../../components/Forms/Employee Form/AdditionalDetailsForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAttributes } from '../../../services/operations/Attribute'
import { getOrganizations } from '../../../services/operations/AsideBar'
import CreateForm from '../../../components/Forms/CreateForm'
import { getAllDepartments } from '../../../services/operations/Department'
import { useLocation } from 'react-router-dom'

const CreateEmployee = () => {
  const Theme = useSelector((state)=>state.Theme.theme)
  const location = useLocation()
  const preFilled = location.state?.preFilled
  console.log(preFilled)
  const [formState,setFormState] = preFilled ? useState(2) : useState(1)
  const [userId,setUserId] = useState("")
  const dispatch = useDispatch()

  const parent = location.pathname.split("/").at(-1).replace("-"," ").split(" ")[1].replace("-","")
  console.log("Parent-=-=-=-=-=--=-=>>>>>>",parent)
  useEffect(()=>{
    dispatch(getAttributes(parent))
    dispatch(getOrganizations())
    dispatch(getAllDepartments())
  },[])

  const customAttributes = useSelector((state)=>state.Attribute.employee)
  // console.log(customAttributes)
  const OrganizationData = useSelector((state)=>state.Aside.organizations)
  // console.log("CUSTOMMMM____+++++++_____+++++++",customAttributes)
  console.log("UUSSEERR  IIDD",userId)
  return(
    <>
      <div className={`flex flex-col gap-10 items-center rounded-lg ${Theme=="Dark" ? "bg-slate-800 text-white" : "bg-slate-100"}`}>
        
      <div className='flex justify-between font-bold w-full p-5 text-xl'>
           <p>{location.pathname.split("/").at(-1).replaceAll("-"," ")}</p>
           <p>Home / <span className='text-yellow-600'>{location.pathname.split("/").at(-1).replaceAll("-"," ")}</span></p>
           </div>

   <FormStatus
   formState={formState}
   />
  
{    formState==1 && <CreateEmployeeForm
    setUserId={setUserId}
    setFormState={setFormState}
/>}

{formState==2 &&   <CreateForm 

// preFilled = {preFilled}
    userId={userId}
    setFormState={setFormState}
    customAttributes={customAttributes}
    parent={parent}
    
  />}

{formState==3 &&  <AdditionalDetailsForm
 userId={userId}
/>}

  </div>
  
    </>
  )
 
}

export default CreateEmployee


// return (
//   <div className='flex flex-col gap-10 items-center justify-center'>
//    <FormStatus
//    formState={formState}
//    />
  
// {    formState==1 && <CreateEmployeeForm/>}

// {formState==2 && <PersonalDetailsForm/>}

// {formState==3 &&  <AdditionalDetailsForm/>}

//   </div>
// )