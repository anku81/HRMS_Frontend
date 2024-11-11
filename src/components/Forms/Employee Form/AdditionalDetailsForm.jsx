import React, { useState } from 'react'
import EmergencyContact from './AdditionalDetails/EmergencyContact'
import AddressDetails from './AdditionalDetails/AddressDetails'
import BankDetails from './AdditionalDetails/BankDetails'
import { useForm,Controller } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const AdditionalDetailsForm = ({userId}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const preFilled = location.state?.preFilled
  console.log(preFilled?.additionalDetails)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [emergencyContact,setEmergencyContact] = useState(null)
  const [addressDetails,setAddressDetails] = useState(null)
  const [bankDetails,setBankDetails] = useState(null)

  console.log(emergencyContact,addressDetails,bankDetails)

  function clickHandler(e){
    e.preventDefault()
// console.log(data)
   navigate("/home/Employee-List")
    console.log(emergencyContact,addressDetails,bankDetails)
    
  }
  return (

    <div
    
    >

      <EmergencyContact
     
      userId={userId}
      setEmergencyContact={setEmergencyContact}
      emergencyContact={emergencyContact}
      />
      <AddressDetails
      userId={userId}
      setAddressDetails={setAddressDetails}
      addressDetails={addressDetails}
      />
      <BankDetails
       userId={userId}
      setBankDetails={setBankDetails}
      bankDetails={bankDetails}
      />

      <button onClick={(e)=>clickHandler(e)}>SubMit Form</button>
    </div>
  )
}

export default AdditionalDetailsForm
