import React, { useEffect } from 'react'
import InputField from '../../../common/InputField'
import { useForm,Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { editEmployeeAdditionalDetails } from '../../../../services/operations/Employee';
import { useLocation } from 'react-router-dom';
const BankDetails = ({setBankDetails,bankDetails,userId}) => {
  const Theme = useSelector((state)=>state.Theme.theme)
    const dispatch = useDispatch()
    const location = useLocation()
    const preFilled = location.state?.preFilled
    console.log(preFilled?.additionalDetails?.bankDetails,preFilled?.additionalDetails?.addressDetails?.accountNumber,preFilled?.additionalDetails?.addressDetails.accountNumber)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors },
      } = useForm();
const bankData = preFilled?.additionalDetails?.bankDetails


      useEffect(()=>{
        preFilled && setValue("bankName",preFilled?.additionalDetails?.bankDetails?.bankName)
      },[])
    return (
        <div className='p-5'>
        <p className='text-center'>Bank Details</p>
      <form 
        

      onSubmit={handleSubmit((data) =>{
        setBankDetails(data)
        preFilled ? 
        dispatch(editEmployeeAdditionalDetails(preFilled?._id,null,null,null,null,null,null,null,null,data.bankName,data.accountNumber,data.ifscCode,data.bankBranch))

        : dispatch(editEmployeeAdditionalDetails(userId,null,null,null,null,null,null,null,null,data.bankName,data.accountNumber,data.ifscCode,data.bankBranch))
        
      } )}
      className='flex flex-col gap-12    mx-auto '>
        <div>
     
       <select
                 className={`appearance-none w-full min-w-72 max-w-96 p-2 drop-shadow-lg border-2 rounded mb-3 mx-auto ${Theme=="Dark" ? "bg-slate-800 text-white" : "bg-slate-100"}`}
                 
       {...register("bankName", { required: true })}
       >
            <option>Select Bank</option>
            <option value={"State Bank of India"}>State Bank of India</option>
            <option value={"Punjab National Bank"}>Punjab National Bank</option>
            <option value={"ICICI Bank"}>ICICI Bank</option>
            <option value={"Axis Bank"}>Axis Bank</option>
            <option value={"HDFC Bank"}>HDFC Bank</option>
        </select>
   
        </div>
      <div className='flex flex-wrap gap-12'>
    
      
      <InputField
        label={`Account Number`}
        placeholder={`Account Number`}
        defaultValue = {bankData?.accountNumber}
        {...register('accountNumber', { required: true })}
        />
        <InputField
        label={`IFSC Code`}
        placeholder={`IFSC Code`}
        defaultValue = {bankData?.ifscCode}
        {...register('ifscCode', { required: true })}
        />
    
    <InputField
        label={`Bank Branch`}
        placeholder={`Bank Branch`}
        defaultValue = {bankData?.bankBranch}
        {...register('bankBranch', { required: true })}
        />
     
      </div>
        <button className='text-left'>{(bankDetails || preFilled?.additionalDetails?.bankDetails) ? "Edit Bank Details" : "+ Add Bank Details"}</button>
      </form>
      
    </div>
      )
}

export default BankDetails
