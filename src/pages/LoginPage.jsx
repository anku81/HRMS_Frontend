import React, { useEffect } from 'react'
import LoginForm from '../components/authComponents/LoginForm'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAsideTabs } from '../services/operations/AsideBar'

const LoginPage = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state)=>state.Auth.isLoggedIn)

 
  useEffect(()=>{
    if(isLoggedIn)
    {
      navigate("/")
    }
  },[])
  return(
    <>
   { !isLoggedIn && <LoginForm/> }
    </>
  )
  

}

export default LoginPage
