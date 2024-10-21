import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Tooltip from './Tooltip'

const UserData = () => {

  const user = useSelector((state)=>state.User)
  const [userData,setUserData] = useState({name:"",role:""})
  const [clicked,setClicked] = useState(false)
  const fetchData = ()=>{
    setUserData(()=>{
      return {
       name : user.name,
       role : user.role
      }
     })
  }
  useEffect(()=>{
    
        fetchData()
      
  },[user])
  console.log(userData)
  return (
    <>
    <div 
    onClick={(e)=>{
      e.preventDefault()
      setClicked(!clicked)
    }}
    className='flex items-center '>

       {
       clicked &&   <Tooltip/>
       }
          <img
          className='border h-10 w-10 rounded-full'
         
           src='' alt='Happy'></img>
       

        <div className='flex flex-col justify-center p-4 text-black'>
            <p className=' font-serif'>{userData.name}</p>
            <p className=' font-serif'>{userData.role}</p>
        </div>
    </div>
    </>
  )
}

export default UserData
