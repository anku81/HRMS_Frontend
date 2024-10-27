import React, { useEffect, useState } from 'react'
import { useForm,Controller } from 'react-hook-form';
import AttributeList from './AttributeList';
import { useDispatch, useSelector } from 'react-redux';
import { addAttribute } from '../../services/operations/Attribute';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrganization } from '../../services/operations/Organization';
import ManageAttributes from './ManageAttributes';
import { addSubOrganization } from '../../services/operations/SubOrganization';
import InputField from '../common/InputField';
import SearchResult from './SearchResult';
import { getEmployeeById, getEmployeesByName } from '../../services/operations/Employee';
import { addDepartment } from '../../services/operations/Department';
const CreateForm = ({customAttributes,parent}) => {
  const location = useLocation()

  const preFilled = location.state?.preFilled
    const [manageAttributes,setManageAttributes] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [managerId,setManagerId] = useState(null)
    const OrganizationList = useSelector((state)=>state.Aside.organizations)
    const searchList = useSelector((state)=>state.Aside.searchList)
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        control,
        formState: { errors },
      } = useForm();

      useEffect(()=>{
        let timerId;
        if (searchTerm.trim() !== "")
        {
           timerId = setTimeout(()=>{
            console.log("New searchTerm",searchTerm)
            dispatch(getEmployeesByName(searchTerm))
          },500)
        }

        return ()=>{
          clearTimeout(timerId)
        }
      },[searchTerm])
      useEffect(() => {

        if (preFilled?.manager) {
          setSearchTerm(preFilled.manager);
        }
        if(!preFilled)
        {
          setSearchTerm("")
          reset()
        }
      }, [preFilled]);
      
      function submissionHandler(data)
      {
        console.log("DATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTt",data)

        if(parent==="Organization")
        {
            const customAttributes = []
            for(let key in data)
            {
                if(key!=="name" && key!=="file" && key!=="description" )
                {
                    customAttributes.push({title:key,value:data[key]})
                }
            }
            // console.log("customAttributes Array",customAttributes)
            dispatch(addOrganization(data.name,data.description,customAttributes,data.file[0]))
        }
        else if(parent==="SubOrganization")
        {
          console.log(data)
          const customAttributes = []
          for(let key in data)
          {
              if(key!=="name" && key!=="organizationId"  )
              {
                  customAttributes.push({title:key,value:data[key]})
              }
          }
            dispatch(addSubOrganization(data.name,customAttributes,data.organizationId))
        }
        else if(parent==="Department")
        {

          console.log("DATTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTt",data)
          const customAttributes = []
          for(let key in data)
          {
              if(key!=="name" && key!=="organizationId" && key!=="description" && key!=="managerId"  )
              {
                  customAttributes.push({title:key,value:data[key]})
              }
          }
          dispatch(addDepartment(data.name,data.description,customAttributes,data.organizationId,managerId))
        }
      }


      // console.log("::::::::::::::::::::",location.state,preFilled)

console.log("MANAGER___IDDD",managerId,parent)
  


      return (
        <div className='bg-gray-400 flex justify-center m-4 rounded-lg p-7'>
            <button 
            onClick={(e)=>{
                e.preventDefault()
                setManageAttributes(!manageAttributes)
            }}
            className='border p-2 bg-blue-500 h-9'
            >{manageAttributes?"Back":"Manage Attributes"}</button>







        {
            !manageAttributes &&    
            
            <form
             
            className='flex flex-col border items-center bg-white p-3 w-1/3 min-w-96'
            onSubmit={handleSubmit((data) =>submissionHandler(data))}>


        {
          ((parent==="SubOrganization" || parent==="Department") && !preFilled) &&  
           <div>
          <label htmlFor="organizationId">Select a organization</label>
          <select id="organizationId" {...register("organizationId", { required: true })}>
          <option value="">--Select--</option>
          {
          OrganizationList && OrganizationList.map((item)=>  <option value={item._id}>{item.name}</option>)
          }
             
            
            
          </select>
          {errors.organizationId && <p>This field is required</p>}
      </div>
        }
      
     {
      parent==="Organization"  &&   <div className='flex flex-col'> 

      
      <div className='flex gap-7 items-center'>
       <div className='border w-16 h-16 rounded-full'></div>

   <div className='flex flex-col'>
       <p>Add Organization logo</p>
   <label
       className='cursor-pointer bg-black text-white px-4 py-2 rounded mt-2'
           htmlFor='file'>Select</label>
       <input 
        type='file'
           className=' max-w-72 p-2 border border-gray-400 rounded hidden'
           id='file'
         {...register('file', { required: true })} />
         {errors.file && <p>file is required.</p>}
   </div>
      </div>


        
       </div>
     }
      <div className='flex flex-col'>
      {/* <label htmlFor='name'>{parent} Name</label>
       <input 
        
           className=' max-w-72 p-2 border border-gray-400 rounded'
           id='name'
         {...register('name', { required: true })} />
         {errors.name && <p>Name is required.</p>} */}

         <InputField
         label ={`${parent} Name`}
         id='name'
         defaultValue={preFilled?preFilled?.name:""}
        {...register('name', { required: true })} 
        errors={errors.name}
         />


      </div>
   
    {  (parent==="Organization" || parent==="Department") &&   <div className='flex flex-col'>
           {/* <label htmlFor='description'>{parent} Description</label>
       <input 
            className=' max-w-72 p-2 border border-gray-400 rounded'
           id='description'
         {...register('description', { required: true })} />
         {errors.description && <p>Description is required.</p>} */}

         <InputField
         label ={`${parent} Description`}
         id='description'
         defaultValue={preFilled ? preFilled?.description : ""}
        {...register('description', { required: true })} 
        errors={errors.description}
         />
       </div>
       }

      
  {
    
    parent==="Department" && 
     <div  className='flex flex-col'>
       <label htmlFor='manager'>Manager</label>
       {/* <Controller
       name='manager'
       control={control}
       
       defaultValue={searchTerm}
       render={({field})=>{
       return <input
       {...field}
       type='search'
         className=' max-w-72 p-2 border border-gray-400 rounded'
        id='manager'
        value={searchTerm} // Sync input with searchTerm state
                onBlur={field.onBlur}
        onChange={(e)=>{
          field.onChange(e)
        
          setSearchTerm(e.target.value)
        }}
        // {...register("manager", { required: true })}
       />

       }}
       />
    {errors.manager && <span>This field is required</span>}  */}
  {console.log("pppppppppppppppppppppppppppppppppppppppppppppppp",preFilled?.manager)}

    <input
     
       type='search'
         className=' max-w-72 p-2 border border-gray-400 rounded'
        id='manager'
        value={searchTerm  } 
       
        onChange={(e)=>{
 setSearchTerm(e.target.value)
        }}
     
        />

  {/* {  console.log("::::::::::::::KKKKKKKK",searchTerm,searchList)} */}
    {/* <input
     
       type='text'
        id='manager'
         className=' max-w-72 p-2 border border-gray-400 rounded '
       value={managerId}
        // value={searchList ? searchList.name : ""}
      //  onFocus={()=>setSearchTerm(searchList.name)}
        {...register("managerId", { required: true })}
       /> */}
       {console.log("SSSSSSSSSSSSSSSS",searchTerm)}
     {  searchTerm && <SearchResult
      setSearchTerm={setSearchTerm}
      setManagerId={setManagerId}
      />}
    </div>
  }
  {/* {console.log("ooooooooooo",customAttributes,parent)} */}
{
       customAttributes && customAttributes.map((item,index)=><div className='flex flex-col'>
           {/* {console.log(preFilled?.customAttributes?.map((elem)=>(elem?.title==item?.title ? item?.title :""))[0],item)} */}
           <label htmlFor='desc'>{item.title}</label>
       <input 
            className=' max-w-72 p-2 border border-gray-400 rounded'
            defaultValue={preFilled ? preFilled?.customAttributes?.map((elem)=>(elem?.title==item?.title ? item?.title :""))[index] : ""}
           id='desc'
           
         {...register(`${item.title}`, { required: true })} />
         {/* {errors.{item.title} && <p>{item.title} is required.</p>} */}
            </div>)

}
         <button className='bg-yellow-300 p-2'>Submit</button>

       </form>
        }

        

       <div>
         {
         manageAttributes &&   <ManageAttributes parent={parent}/>
                    
                    }
                     {
                     
                    ( manageAttributes && customAttributes) && customAttributes.map((item)=><AttributeList item={item} parent={parent}/>)}
                      
       </div> 
        
        </div>
      )
}

export default CreateForm
