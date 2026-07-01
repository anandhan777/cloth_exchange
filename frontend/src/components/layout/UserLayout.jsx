import React from 'react'
import Usernav from '../navbar/Usernav'
import {Outlet} from 'react-router-dom'
import Sidebar from '../sidebar/Usersidebar'
import{useEffect,useState} from "react"
import axios from "axios"

function UserLayout() {
   const[profile,setProfile]=useState({});
  
    useEffect(()=>{
      const token=localStorage.getItem("token");
      const fetchProfile=async()=>{
        const res=await axios.get("https://cloth-exchange-backend.onrender.com/api/users/getprofile",{headers:{Authorization:`Bearer ${token}`}});
      
        setProfile(res.data);
  
      }
      fetchProfile();
    },[])
  return (
    <div>
      <div className=''><Sidebar profile={profile}/>
      
      <div className="flex"> <Usernav/>
      </div></div>
     
      <Outlet/>
    </div>
  )
}

export default UserLayout