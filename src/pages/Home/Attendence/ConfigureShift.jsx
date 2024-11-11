import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addLocation, addTiming, getAttendenceData } from '../../../services/operations/Attendence';

const ConfigureShift = () => {
    const dispatch = useDispatch()


    const Hrs = [...Array(12)].map((item, index) => index + 1);
    const Min = [...Array(60)].map((item, index) => index + 1);
    const [time,setTime] = useState("")
    const [location,setLocation] = useState(null)
    const attendenceData = useSelector((state)=>state.Aside.attendenceData)
  useEffect(()=>{
 
dispatch(getAttendenceData())
  },[])
console.log(attendenceData)
  
function getLocation(){

    if(window.navigator.geolocation )
    {
        window.navigator.geolocation.getCurrentPosition((position)=>{
            const { latitude, longitude } = position.coords;
        
            (latitude && longitude)  ?
            dispatch(addLocation(location,latitude,longitude))
            : alert("Failed to fetch location")
      
        })
    }
    else
    {
        alert("Browser doesn't support geoloation")
    }
}

function addShiftTime(){
 
    const hours = time.split(":")[0]
    const minutes = time.split(":")[1]
    // console.log(time,hours,minutes)
    dispatch(addTiming(hours,minutes))
}
  return (
    <div className='flex  p-5 gap-3'>
  
      <div className='border w-1/2 flex flex-col items-center'>
      <div className='flex flex-col'>
        <h1>Add Shift Details</h1>

       
        <p>Shift Timings (HH:mm)</p>
 {/* <div className='max-h-40 border border-green-400 overflow-y-hidden'>
    
 <select
 className=' px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none appearance-none'
 onChange={(e)=>setHours(e.target.value)}>
        <option value={null}>HH</option>
       { Hrs.map((item)=><option value={item}>{item}</option>)}
        </select>

        <select
         className=' px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none appearance-none'

        onChange={(e)=>setMinutes(e.target.value)} >
        <option value={null}>mm</option>
       { Min.map((item)=><option value={item}>{item}</option>)}
        </select>

        <select
         className=' px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none appearance-none'

        onChange={(e)=>setMeridian(e.target.value)}>
            <option value={"AM"}>AM</option>
            <option value={"PM"}>PM</option>
        </select>
 </div> */}

 <input
 className='border p-2'
 value={time}
 onChange={(e)=>setTime(e.target.value)}
 placeholder='HH:MM'
 />
        <button 
        onClick={()=> addShiftTime()}
        className='bg-blue-700 text-white p-2 rounded-md  w-16  mx-auto'>Submit</button>
      </div>

      <div>
        <p>Shift Timings</p>

        <div className='flex gap-4'>
        {attendenceData?.timing && <p>{attendenceData?.timing?.hours} : {attendenceData?.timing?.minutes} </p>}
        <div className='flex items-center gap-3'>
        <FiEdit 
        className='text-blue-400'
        onClick={()=>editHandler(item)}
        />
        <MdDelete
           className='text-red-500'
        onClick={()=>deleteHandler(item._id)}
        />
        </div>
        </div>
      </div>
      </div>


      <div className='border w-1/2'>
      <div >
        <h1>Add Attendence Location</h1>
        <p>Location Name</p>
        <input
        className='border'
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
        />
        <button 
        onClick={()=>{
            getLocation()
        }}
        className='bg-blue-700 text-white p-2 rounded-md'>Add Location</button>
      </div>

      <div>
        <p>Shift Timings</p>
        <div className='flex items-center gap-3'>
        <FiEdit 
        onClick={()=>editHandler(item)}
        />
        <MdDelete
        onClick={()=>deleteHandler(item._id)}
        />
        </div>
      </div>
      </div>
    </div>
  )
}

export default ConfigureShift
