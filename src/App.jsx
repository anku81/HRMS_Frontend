
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/Home/HomePage'

import NavBar from './components/NavBar/NavBar'
import CreateOrganization from './pages/Home/Organization/CreateOrganization'
function App() {
 

  return (
   <>
   <NavBar />
   <Routes>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path="/home" element={<HomePage/>}>
    
    <Route path='/home/Create-Organization' element={<CreateOrganization/>}></Route>
    
    </Route>
    
        </Routes>
   </>
  )
}

export default App
