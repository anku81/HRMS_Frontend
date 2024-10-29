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

const CreateEmployee = () => {
  const [formState,setFormState] = useState(1)
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
  console.log("CUSTOMMMM____+++++++_____+++++++",customAttributes)
  return(
    <>
      <div className='flex flex-col gap-10 items-center justify-center'>
   <FormStatus
   formState={formState}
   />
  
{    formState==1 && <CreateEmployeeForm/>}

{formState==2 &&   <CreateForm 
    customAttributes={customAttributes}
    parent={parent}
    
  />}

{formState==3 &&  <AdditionalDetailsForm/>}

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