import React, { Children } from 'react'
import NavBar from '../../components/NavBar'
import { Outlet, Link } from "react-router-dom";

const HomePage = () => {
  const data = [
    {label : "Organization"},
    {label : "Sub Organization"},
    {label : "Department"},
    {label : "Employee",Children:["org","OrgList"]}
  ]


 
  return (
    <>
    <div className=' border border-neutral-950 h-screen'>
      <NavBar/>
      
      <div className='border border-green-800 h-full '>
        <ul className=' ' >
        {
          false &&   <li className=''>Dashboard</li>
        }
        
        {
          data.map((item)=>{
           return <li>{item.label}</li>
          })
        }
       

        </ul>
        </div>

        <div>
        <Outlet/>
        </div>
    </div>
    </>
  )
}

export default HomePage
