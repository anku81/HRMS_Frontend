import React from 'react'
import InputField from '../../../common/InputField'

const EmergencyContact = () => {
  return (
    <div>
        <p className='text-center'>Emergency Contact</p>
      <form className='flex flex-col gap-12'>
      <div className='flex gap-12'>
      <InputField
        label={`Contact`}
        />
        <InputField
        label={`Relationship`}
        />
      </div>
        <button className='text-left'>+ Add Contact</button>
      </form>
      
    </div>
  )
}

export default EmergencyContact
