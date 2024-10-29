import React from 'react'
import EmergencyContact from './AdditionalDetails/EmergencyContact'
import AddressDetails from './AdditionalDetails/AddressDetails'
import BankDetails from './AdditionalDetails/BankDetails'

const AdditionalDetailsForm = () => {
  return (
    <div>
      <EmergencyContact/>
      <AddressDetails/>
      <BankDetails/>
    </div>
  )
}

export default AdditionalDetailsForm
