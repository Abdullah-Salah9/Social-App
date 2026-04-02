import {Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem,  Button} from "@heroui/react";
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { counterContext } from "../Context/CounterContext";
import { AuthContext } from "../Context/AuthContext";


export default function Navbar() {
  
  let {counter} = useContext(counterContext)
  
  const {isLoggedIn, setIsLoggedIn, setUserData} = useContext(AuthContext)

  const navigate = useNavigate()

  function logOut(){
    localStorage.removeItem('token');
    setIsLoggedIn(null);
    setUserData(null)
    navigate('/login');
  }

  return <>
  
  <HeroNavbar>
      <NavbarBrand>
        
        <Link to={'/'} className="font-bold text-inherit">Linked Posts {counter} </Link>
      </NavbarBrand>
  
      <NavbarContent justify="end">

        {isLoggedIn?<> <NavbarItem onClick={logOut} className="cursor-pointer">
          LogOut
        </NavbarItem>
        <NavbarItem>
          <NavLink to={'/profile'}>Profile</NavLink>
        </NavbarItem>
        </> :
        <>
        <NavbarItem>
          <NavLink to={'/register'}>Sign Up</NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to={'/login'}>Sign In</NavLink>
        </NavbarItem>
        </>}
        
        
      </NavbarContent>
    </HeroNavbar>

  </>
}
