import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import AttributeList from '../AttributeList'

const Designation = ({setDesignation,setDesignationData}) => {
  const dispatch = useDispatch()

  const designations = [{title : "desg1"},{title : "desg2"},{title : "desg3"}]
  const [desgList,setDesgList]=useState(designations.reduce((acc,key)=>{
    acc[key.title] = false
    return acc
  },{}))
  const[clicked,setClicked] = useState(false)

  const desgInput = useRef("")
console.log(desgInput.current)
  return (
    <div className=' h-full bg-transparent z-50 fixed top-0 left-0 right-0 border backdrop-blur-sm flex flex-col justify-center items-center  '>
          
          <div  className='flex gap-2'>
<div>
   
                 <input 
                   type='text'
                   placeholder='Enter Designation'
                   onChange={(e)=>{
                    e.preventDefault()
                    desgInput.current = e.target.value
                   }}
                      className={`min-w-72 p-2 border rounded`}
          
                     />
     
                 </div>
           
                   <div>
                   <button
                   onClick={(e)=>{
                    e.preventDefault()
                    console.log(desgInput.current)
                    // dispatch((desgInput.current))
                   }}
                  className='cursor-pointer bg-black text-white px-4 py-2 rounded mt-2 translate-y-[-7px]'
                     >Add</button>
                   </div>
</div>
<div className='flex gap-4'>

{
    designations && designations.map((item)=><AttributeList item={item} parent={"designations"} desgList={desgList} setDesgList={setDesgList}/>
    
)
}
</div>

<div className='flex gap-4'>
<button 
      onClick={(e)=>{
      
        e.preventDefault()
        const arr = Object.entries(desgList).map((item)=>{
          if(item[1]==true)
          {
            return item[0]
          }
       
        } )
     
        setDesignationData(arr)
      }}
      className='bg-black text-white rounded p-3'>ADD</button>
      <button 
      onClick={(e)=>{
        console.log("HRERE",designations)
        e.preventDefault()
        setDesignation(false)
      }}
      className='bg-gray-300 rounded p-3'>Cancel</button>
</div>
        
    </div>
  )
}

export default Designation
