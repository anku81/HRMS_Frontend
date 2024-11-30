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
       role : user.role,
       profilePicture : user.profilePicture
      }
     })
  }
  useEffect(()=>{
    
        fetchData()
      
  },[user])
  console.log(user)
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
         
           src={userData.profilePicture} alt='Happy'></img>
       

        <div className='flex flex-col justify-center p-4 text-black'>
            <p className=' font-serif'>{userData.name}</p>
            <p className=' font-serif'>{userData.role}</p>
        </div>
    </div>
    </>
  )
}

export default UserData
