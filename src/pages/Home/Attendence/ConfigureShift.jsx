import React, { useEffect, useRef, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addLocation, addTiming, deleteLocation, deleteTiming, editLocation, editTiming, getAttendenceData } from '../../../services/operations/Attendence';

const ConfigureShift = () => {
    const dispatch = useDispatch()
    const button = useRef("Submit");
    const locationButton = useRef("Add Location");
    const locationId = useRef(null);

    const Hrs = [...Array(12)].map((item, index) => index + 1);
    const Min = [...Array(60)].map((item, index) => index + 1);
    const [time,setTime] = useState("")
    const [location,setLocation] = useState("")
    const attendenceData = useSelector((state)=>state.Aside.attendenceData)
  useEffect(()=>{
 
dispatch(getAttendenceData())
  },[])


console.log(attendenceData)
  
function getLocation(){
    console.log(locationButton.current)
    if(window.navigator.geolocation )
    {
        window.navigator.geolocation.getCurrentPosition((position)=>{
            const { latitude, longitude } = position.coords;
        
            (latitude && longitude)  ?
            locationButton.current == "Add Location"?
            dispatch(addLocation(location,latitude,longitude)) : dispatch(editLocation(attendenceData?._id,locationId.current,location,latitude,longitude))
            : alert("Failed to fetch location")
      
        })
    }
    else
    {
        alert("Browser doesn't support geoloation")
    }
}
function editShiftTiming(data){
    button.current = "Update"

    setTime(data?.hours + ":" +  data?.minutes)
}
function shiftTimeHandler(){
 
    const hours = time.split(":")[0]
    const minutes = time.split(":")[1]
    // console.log(time,hours,minutes)
    button.current=="Update" ? dispatch(editTiming(attendenceData._id,hours,minutes)): 
    dispatch(addTiming(hours,minutes))
}

function editLocationHandler(data){
   
    locationId.current = data?._id
    locationButton.current="Update Location"
    setLocation(data?.name)
    console.log(locationId.current,data,Number(data.latitude.$numberDecimal))
    // const latitude =Number(data.latitude.$numberDecimal)
    // const longitude =  Number(data.longitude.$numberDecimal)
}

  return (
    <div className='flex  p-5 gap-3'>
  
      <div className='border w-1/2 flex flex-col items-center text-center'>
      <div className='flex flex-col gap-3'>
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
        onClick={()=>shiftTimeHandler()}
        className='bg-blue-700 text-white p-2 rounded-md  mx-auto'>{button.current}</button>
      </div>

      <div>
        <p>Shift Timings</p>

      {  attendenceData?.timing?.hours && <div className='flex gap-4'>
        {attendenceData?.timing && <p>{attendenceData?.timing?.hours} : {attendenceData?.timing?.minutes} </p>}
        <div className='flex items-center gap-3'>
        <FiEdit 
        className='text-blue-400'
        onClick={()=>editShiftTiming(attendenceData?.timing)}
        />
        <MdDelete
           className='text-red-500'
        onClick={()=>dispatch(deleteTiming(attendenceData?._id))}
        />
        </div>
        </div>}
      </div>
      </div>


      <div className='border w-1/2 flex flex-col items-center text-center'>
      <div className='flex flex-col gap-3' >
        <h1>Add Attendence Location</h1>
        <p>Location Name</p>
        <input
        className='border p-2'
        value={location}
        placeholder='Location Name'
        onChange={(e)=>setLocation(e.target.value)}
        />
        <button 
        onClick={()=>{
            getLocation()
        }}
        className='bg-blue-700 text-white p-2 rounded-md   mx-auto'>{ locationButton.current}</button>
      </div>

      <div>
        <p>Attendence Locations</p>
        {
            console.log(attendenceData?.locations)
        }
        {
          attendenceData?.locations && attendenceData?.locations.map((item)=>{
          
                return <div className='flex justify-center gap-5'>

<p>{item?.name}</p>
                <div className='flex items-center gap-3'>
                <FiEdit 
                 className='text-blue-400'
                onClick={()=>editLocationHandler(item)}
                />
                <MdDelete
                 className='text-red-500'
                onClick={()=>dispatch(deleteLocation(attendenceData?._id,item?._id))}
                />
                </div>
                </div>
            })
        }
       
      </div>
      </div>
    </div>
  )
}

export default ConfigureShift
