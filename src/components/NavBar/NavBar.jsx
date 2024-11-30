import React, { useEffect, useState } from 'react';
import Avisoft from '../../assets/Avisoft.svg';
import { WiDaySunny } from "react-icons/wi";
import { WiNightAltCloudy } from "react-icons/wi";
import { useDispatch, useSelector } from 'react-redux';
import UserData from './UserData';
import { setTheme } from '../../redux/slices/themeSlice';

const NavBar = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state)=>state.Auth.isLoggedIn) 
  const Theme = useSelector((state)=>state.Theme.theme)

  useEffect(()=>{

  },[dispatch])

  return (
    <>
      <nav className={`w-full h-[10vh]  flex flex-row items-center justify-between shadow-xl  px-9 ${Theme=="Dark" ? "bg-slate-800 text-white" : ""} `}>
        <div className="flex items-center">
          <img className="h-20 w-20 p-2" src={Avisoft} alt="Avi Logo" />
        </div>

        <div className="flex items-center gap-5">
          {/* <img className="h-12 w-12 p-2" src={ThemeLogo} alt="Theme Logo" /> */}
      <button onClick={()=>dispatch(setTheme(Theme=="Dark" ? "Light" : "Dark"))}>
      {  Theme=="Dark" && <WiDaySunny 
      className='text-orange-500'
      size={35} />  }
       {
        Theme=="Light" && <WiNightAltCloudy 
         className='text-blue-800'
        size={35} />
       }
      </button>
           {isLoggedIn && <UserData
          
           />}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
