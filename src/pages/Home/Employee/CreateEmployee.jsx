import React, { useState } from 'react'
import CreateEmployeeForm from '../../../components/Forms/Employee Form/CreateEmployeeForm'
import FormStatus from '../../../components/Forms/Employee Form/FormStatus'
import PersonalDetailsForm from '../../../components/Forms/Employee Form/PersonalDetailsForm'
import AdditionalDetailsForm from '../../../components/Forms/Employee Form/AdditionalDetailsForm'

const CreateEmployee = () => {
  const [formState,setFormState] = useState(1)
  return (
    <div className='flex flex-col gap-10 items-center justify-center'>
     <FormStatus
     formState={formState}
     />
    
{    formState==1 && <CreateEmployeeForm/>}

{formState==2 && <PersonalDetailsForm/>}

{formState==3 &&  <AdditionalDetailsForm/>}

    </div>
  )
}

export default CreateEmployee
