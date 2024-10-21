import React, { useState } from 'react';
import Avisoft from '../../assets/Avisoft.svg';
import { WiDaySunny } from "react-icons/wi";
import { WiNightAltCloudy } from "react-icons/wi";
import { useSelector } from 'react-redux';
import UserData from './UserData';

const NavBar = () => {
  const isLoggedIn = useSelector((state)=>state.Auth.isLoggedIn) 

const [theme,setTheme]=useState(false)
  return (
    <>
      <nav className="w-full h-[10vh] border flex flex-row items-center justify-between rounded-b-lg  shadow-xl px-9">
        <div className="flex items-center">
          <img className="h-20 w-20 p-2" src={Avisoft} alt="Avi Logo" />
        </div>

        <div className="flex items-center gap-5">
          {/* <img className="h-12 w-12 p-2" src={ThemeLogo} alt="Theme Logo" /> */}
      <button onClick={()=>setTheme(!theme)}>
      {  theme && <WiDaySunny 
      className='text-orange-500'
      size={35} />  }
       {
        !theme && <WiNightAltCloudy 
         className='text-blue-800'
        size={35} />
       }
      </button>
           {isLoggedIn && <UserData/>}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
