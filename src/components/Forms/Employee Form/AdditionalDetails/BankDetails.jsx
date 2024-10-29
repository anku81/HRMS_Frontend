import React from 'react'
import InputField from '../../../common/InputField'

const BankDetails = () => {
    return (
        <div className='p-5'>
        <p className='text-center'>Bank Details</p>
      <form className='flex flex-col gap-12 w-3/4 border  mx-auto '>
      <div className='flex flex-wrap gap-12'>
    
       <label className='flex flex-col'>
        Bank Name
       <select>
            <option>Select Address Type</option>
            <option>State Bank of India</option>
            <option>Punjab National Bank</option>
            <option>ICICI Bank</option>
            <option>Axis Bank</option>
            <option>HDFC Bank</option>
        </select>
       </label>
      <InputField
        label={`Account Number`}
        />
        <InputField
        label={`IFSC Code`}
        />
    
    <InputField
        label={`Bank Branck`}
        />
     
      </div>
        <button className='text-left'>+ Add Bank Details</button>
      </form>
      
    </div>
      )
}

export default BankDetails
