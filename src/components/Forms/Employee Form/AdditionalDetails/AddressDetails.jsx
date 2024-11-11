import React, { useEffect } from 'react'
import InputField from '../../../common/InputField'
import { useForm,Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editEmployeeAdditionalDetails } from '../../../../services/operations/Employee';
import { useLocation } from 'react-router-dom';

const AddressDetails = ({setAddressDetails,userId,addressDetails}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const preFilled = location.state?.preFilled
    console.log(preFilled?.additionalDetails?.addressDetails)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors },
      } = useForm();
      console.log(addressDetails)

      useEffect(() => {
      
        // if (preFilled?.additionalDetails?.addressDetails?.addressType) {
          preFilled &&  setValue("addressType", preFilled?.additionalDetails?.addressDetails?.addressType);
        // }
      }, []);
  return (
    <div className='p-5'>
    <p className='text-center'>Address Details</p>
  <form 
  onSubmit={handleSubmit((data) => {
    setAddressDetails(data)
    preFilled ? 
    dispatch(editEmployeeAdditionalDetails(preFilled?._id,null,null,data.addressType,data.propertyNumber,data.city,data.zipCode,data.state,data.country))

    :dispatch(editEmployeeAdditionalDetails(userId,null,null,data.addressType,data.propertyNumber,data.city,data.zipCode,data.state,data.country))  })}
  className='flex flex-col gap-12 w-3/4 border  mx-auto '>
  <div className='flex flex-wrap gap-12'>

    <select
    //  defaultValue = {preFilled?.additionalDetails?.addressDetails?.addressType}
    {...register("addressType", { required: true })}
    >
        <option>Select Address Type</option>
        <option value={"Temporary"}>Temporary</option>
        <option value={"Permanent"}>Permanent</option>
    </select>
  <InputField
    label={`Property Number`}
    defaultValue = {preFilled?.additionalDetails?.addressDetails?.propertyNumber}
    {...register('propertyNumber', { required: true })}
    />
    <InputField
    label={`City`}
    defaultValue = {preFilled?.additionalDetails?.addressDetails?.city}
    {...register('city', { required: true })}
    />

<InputField
    label={`Zipcode`}
    defaultValue = {preFilled?.additionalDetails?.addressDetails?.zipCode}
    {...register('zipCode', { required: true })}
    />
    <InputField
    label={`State`}
    defaultValue = {preFilled?.additionalDetails?.addressDetails?.state}
    {...register('state', { required: true })}
    />
    <InputField
    label={`Country`}
    defaultValue = {preFilled?.additionalDetails?.addressDetails?.country}
    {...register('country', { required: true })}
    />
  </div>
    <button className='text-left'>{(addressDetails || preFilled?.additionalDetails?.addressDetails) ? "Edit Address" : "+ Add Address"}</button>
  </form>
  
</div>
  )
}

export default AddressDetails
