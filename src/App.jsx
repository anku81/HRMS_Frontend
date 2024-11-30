
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/Home/HomePage'

import NavBar from './components/NavBar/NavBar'
import CreateOrganization from './pages/Home/Organization/CreateOrganization'
import OrganizationList from './pages/Home/Organization/OrganizationList'
import CreateSubOrganization from './pages/Home/SubOrganization/CreateSubOrganization'
import SubOrganizationList from './pages/Home/SubOrganization/SubOrganizationList'
import CreateRole from './pages/Home/Role/CreateRole'
import RoleList from './pages/Home/Role/RoleList'
import CreateEmployee from './pages/Home/Employee/CreateEmployee'
import EmployeeList from './pages/Home/Employee/EmployeeList'
import CreateDepartment from './pages/Home/Department/CreateDepartment'
import DepartmentList from './pages/Home/Department/DepartmentList'
import ConfigureShift from './pages/Home/Attendence/ConfigureShift'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setTheme } from './redux/slices/themeSlice'


function App() {
 const dispatch = useDispatch()
 useEffect(()=>{
dispatch(setTheme("Dark"))
 },[])

  return (
   <>
   <NavBar />
   <Routes>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path="/home" element={<HomePage/>}>
    
    <Route path='/home/Create-Organization' element={<CreateOrganization/>}></Route>
    <Route path='/home/Organization-List' element={<OrganizationList/>}></Route>

    <Route path='/home/Create-Sub-Organization' element={<CreateSubOrganization/>}></Route>
    <Route path='/home/Sub-Organization-List' element={<SubOrganizationList/>}></Route>

    <Route path='/home/Create-Department' element={<CreateDepartment/>}></Route>
    <Route path='/home/Department-List' element={<DepartmentList/>}></Route>

    <Route path='/home/Create-Role' element={<CreateRole/>}></Route>
    <Route path='/home/Role-List' element={<RoleList/>}></Route>

    <Route path='/home/Create-Employee' element={<CreateEmployee/>}></Route>
    <Route path='/home/Employee-List' element={<EmployeeList/>}></Route>

    <Route path='/home/Configure-Shift-Timings' element={<ConfigureShift/>}></Route>
    
    </Route>
    
        </Routes>
   </>
  )
}

export default App
