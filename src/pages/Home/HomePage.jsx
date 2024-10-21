import React, { Children, useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { CgFile } from "react-icons/cg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { BiCircle } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { getUserById } from '../../services/operations/Employee';
import { getAsideTabs } from '../../services/operations/AsideBar';
const HomePage = () => {
  const dispatch = useDispatch()
  const location = useLocation()

const navigate = useNavigate()
const [data,setData] = useState([])
// const fetchTabs = async()=>{
//   // const asideTabs = await dispatch(getAsideTabs(navigate))
//   // setData(asideTabs)
 
 
// }
useEffect(()=>{
  const tabData = location.state?.tabData || JSON.parse(localStorage.getItem("asideBar"))
  setData(tabData)
},[])
 
console.log(data,"HAHBCACBHCB")
 
const [clicked,setClicked] = data ? useState(data.reduce((acc,item)=>{

  acc[item.label] = false
  return acc
},{})) : useState({})

function handleClick(label)
{
  setClicked((prev)=>{
   return  {...prev,
    [label] : !prev[label]
  }
  })
}
 
  return (
    <>
    <div className=' border border-neutral-950 h-[90vh] flex'>
      
      <div className='border border-slate-800  h-full w-[22vw] p-3  overflow-y-scroll'>
        <div className='flex flex-col gap-4 text-[1.3rem] ' >

        <p
        onClick={()=>dispatch(getUserById())}
         className='flex items-center gap-2 '> <MdOutlineDashboard />Dashboard</p>
        
        {
        data &&  data.map((item,index)=>{
           return <div key={index}>
           <div  className='flex items-center justify-between '>
            <button onClick={()=>handleClick(item.label)} 
            className='flex items-center justify-between w-full'>
              <div className='flex items-center gap-2'> <CgFile />{item.label}</div>

{!clicked[item.label] && <MdKeyboardArrowRight size={33} />} {clicked[item.label] && <MdKeyboardArrowDown size={33} />}

            </button>
             </div> 
              <div>
              {
                   clicked[item.label] 
                   && item.children 
                   && item.children.map((elem,index)=><p 
                   key={index}
                   onClick={()=>{
                    console.log(`${elem.label.replaceAll(" ","-")}`)
                    navigate(`${elem.label.replaceAll(" ","-")}`)
                   }}
                   
                   className='pl-7 text-lg flex items-center gap-3'>
                    {elem.label.includes("Create") ? <IoPersonAdd /> : <BiCircle />}{elem.label}
                    </p>) 
                    
                }
              </div>
           </div>
          
        
        
        
        })


          
        }

        </div>
        </div>

        <div className='border w-full'>
        <Outlet/>
        </div>
    </div>
    </>
  )
}

export default HomePage
