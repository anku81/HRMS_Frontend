import React from 'react'
import InputField from '../../../common/InputField'
import { useForm,Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editEmployeeAdditionalDetails } from '../../../../services/operations/Employee';
import { useLocation } from 'react-router-dom';
const EmergencyContact = ({setEmergencyContact,userId,emergencyContact}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const preFilled = location.state?.preFilled
    console.log(preFilled?.additionalDetails?.emergencyContact)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors },
      } = useForm();
  return (
    <div>
        <p className='text-center'>Emergency Contact</p>
      <form
      onSubmit={handleSubmit((data) =>{
        setEmergencyContact(data)
        preFilled ? 
        dispatch(editEmployeeAdditionalDetails(preFilled?._id,data.contact,data.relationShip))
        : dispatch(editEmployeeAdditionalDetails(userId,data.contact,data.relationShip))
      })}
      className='flex flex-col gap-12'>
      <div className='flex gap-12'>

      <InputField
        label={`Contact`}
        placeholder={`Contact`}
        defaultValue={preFilled?.additionalDetails?.emergencyContact?.contact}
        {...register('contact', { required: true })}
        />
        <InputField
        label={`Relationship`}
        placeholder={`Relationship`}
        defaultValue={preFilled?.additionalDetails?.emergencyContact?.relationShip}
        {...register('relationShip', { required: true })}
        />
      </div>
        <button className='text-left'>{(emergencyContact || preFilled?.additionalDetails?.emergencyContact) ? "Edit Contact":"+ Add Contact"}</button>
      </form>
      
    </div>
  )
}

export default EmergencyContact
