import React, { useEffect } from 'react'
import InputField from '../../../common/InputField'
import { useForm,Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployeeAdditionalDetails } from '../../../../services/operations/Employee';
import { useLocation } from 'react-router-dom';

const AddressDetails = ({setAddressDetails,userId,addressDetails}) => {
  const Theme = useSelector((state)=>state.Theme.theme)
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
    <div className='w-full '>
    <p className='text-center'>Address Details</p>
  <form 
  onSubmit={handleSubmit((data) => {
    setAddressDetails(data)
    preFilled ? 
    dispatch(editEmployeeAdditionalDetails(preFilled?._id,null,null,data.addressType,data.propertyNumber,data.city,data.zipCode,data.state,data.country))

    :dispatch(editEmployeeAdditionalDetails(userId,null,null,data.addressType,data.propertyNumber,data.city,data.zipCode,data.state,data.country))  })}
  
  className='flex flex-col gap-12  mx-auto  '>
<div>
  
<select
              className={`appearance-none w-full min-w-72 max-w-96 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto ${Theme=="Dark" ? "bg-slate-800 text-white" : "bg-slate-100"}`}

    //  defaultValue = {preFilled?.additionalDetails?.addressDetails?.addressType}
    {...register("addressType", { required: true })}
    >
        <option>Select Address Type</option>
        <option value={"Temporary"}>Temporary</option>
        <option value={"Permanent"}>Permanent</option>
    </select>
</div>
  <div className='flex flex-wrap     gap-12 '>

    

  <InputField
    label={`Property Number`}
    placeholder={`Property Number`}
    defaultValue = {preFilled?.additionalDetails?.addressDetails?.propertyNumber}
    {...register('propertyNumber', { required: true })}
    />

    <InputField
    label={`City`}
    placeholder={`City`}
    defaultValue = {preFilled?.additionalDetails?.addressDetails?.city}
    {...register('city', { required: true })}
    />

<InputField
    label={`Zipcode`}
    placeholder={`Zipcode`}
    defaultValue = {preFilled?.additionalDetails?.addressDetails?.zipCode}
    {...register('zipCode', { required: true })}
    />
    <InputField
    label={`State`}
    placeholder={`State`}
    defaultValue = {preFilled?.additionalDetails?.addressDetails?.state}
    {...register('state', { required: true })}
    />
    <InputField
    label={`Country`}
    placeholder={`Country`}
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
