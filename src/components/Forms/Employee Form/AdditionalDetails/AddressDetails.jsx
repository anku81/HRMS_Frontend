import React from 'react'
import InputField from '../../../common/InputField'

const AddressDetails = () => {
  return (
    <div className='p-5'>
    <p className='text-center'>Address Details</p>
  <form className='flex flex-col gap-12 w-3/4 border  mx-auto '>
  <div className='flex flex-wrap gap-12'>

    <select>
        <option>Select Address Type</option>
        <option>TEMPORARY</option>
        <option>PERMANENT</option>
    </select>
  <InputField
    label={`Property Number`}
    />
    <InputField
    label={`City`}
    />

<InputField
    label={`Zipcode`}
    />
    <InputField
    label={`State`}
    />
    <InputField
    label={`Country`}
    />
  </div>
    <button className='text-left'>+ Add Address</button>
  </form>
  
</div>
  )
}

export default AddressDetails
