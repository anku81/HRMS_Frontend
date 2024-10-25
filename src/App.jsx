import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/Home/HomePage'
import CreateOrg from './pages/Home/CreateOrg'
function App() {
 

  return (
   <>
   <Routes>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/CreateOrg' element={<CreateOrg/>}></Route> 
        </Routes>
   </>
  )
}

export default App
