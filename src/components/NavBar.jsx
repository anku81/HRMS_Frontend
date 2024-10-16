import React from 'react';
import ThemeLogo from '../assets/Theme.png';
import AviLogo from '../assets/avi-loft.png';
import SANav from './SANav';

const NavBar = () => {
  let isLoggedIn;
  // localStorage.setItem("isLoggedIn",true)
  if (localStorage.getItem("isLoggedIn") === "false") {
    isLoggedIn = false;
    console.log("User Logged IN");
  } else {
    isLoggedIn = true;
    console.log("User Not Logged IN");
  }

  return (
    <div className="">
      <nav className="w-full h-16 flex flex-row items-center justify-between rounded-b-lg bg-blue-300 drop-shadow-xl px-4">
        <div className="flex items-center">
          <img className="h-12 w-12 p-2" src={AviLogo} alt="Avi Logo" />
        </div>

        <div className="flex items-center space-x-4">
          <img className="h-12 w-12 p-2" src={ThemeLogo} alt="Theme Logo" />
           {isLoggedIn && <SANav />}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
