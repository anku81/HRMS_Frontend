import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateForm from '../../../components/Forms/CreateForm'
import { getAttributes } from '../../../services/operations/Attribute'

const CreateDepartment = () => {
  const dispatch = useDispatch()
  const parent = location.pathname.split("/").at(-1).replace("-"," ").split(" ")[1]
  console.log("Parent-=-=-=-=-=--=-=>>>>>>",parent)
  useEffect(()=>{
    dispatch(getAttributes(parent))
  },[])
  const customAttributes = useSelector((state)=>state.Attribute.department)
  // const OrganizationData = useSelector((state)=>state.Aside.organizations)
  console.log("CUSTOMMMM____+++++++_____+++++++",customAttributes)
  return(
    <>
    <CreateForm 
    customAttributes={customAttributes}
    parent={parent}
    
  />
    </>
  )
}

export default CreateDepartment
