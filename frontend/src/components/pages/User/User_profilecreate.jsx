import React from 'react'
import {useState,useEffect} from 'react'
import ProfileForm from '../../common/UserProfileForm'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function User_profilecreate() {
  const navigate=useNavigate();
    const [formdata,setFormdata]=useState({
        profilePicture:null,
        profileBanner:null,
        fullname:"",
        email:"",
        phone:"",
        location:"",
        bio:"",
        preferredSize:"",
        favoriteCategory:"",
 });

 useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    setFormdata((prev)=>({...prev,email:user.email}));
 },[])

 const handleChange=(e)=>{
    const {type,name,value,files}=e.target;
  
    if(type==="file"){
          const file=files[0];
        if(name==="profilePicture"){
        setFormdata((prev)=>({...prev,profilePicture:file}));
        }else if(name==="profileBanner"){
            setFormdata((prev)=>({...prev,profileBanner:file}));
        }
    }else{
        setFormdata((prev)=>({...prev,[name]:value}));
    }

    console.log(formdata);
    }
 const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    const user=JSON.parse(localStorage.getItem("user"));
    user.isProfile=true;
    localStorage.setItem("user",JSON.stringify(user));
    }catch(err){
        console.log(err);
    }

    const formData=new FormData();
    formData.append("profilePicture",formdata.profilePicture);
    formData.append("profileBanner",formdata.profileBanner);
    formData.append("fullname",formdata.fullname);
    formData.append("email",formdata.email);
    formData.append("phone",formdata.phone);
    formData.append("location",formdata.location);
    formData.append("bio",formdata.bio);
    formData.append("preferredSize",formdata.preferredSize);
    formData.append("favoriteCategory",formdata.favoriteCategory);
    try{
        const token=localStorage.getItem("token");
    const res=await axios.post("https://cloth-exchange-backend.onrender.com/api/users/profilecreate",formData,{headers:{"Content-Type":"multipart/form-data", "Authorization":`Bearer ${token}`}});
    console.log(res.data);
    }catch(err){
        console.log(err);
    }
    navigate("/user/profile");
 }
  return (
    <div className="bg-[#faf9f5]">
      
      <ProfileForm title="Create Profile" handleSubmit={handleSubmit} formdata={formdata} handleChange={handleChange} />
    </div>
  )
}

export default User_profilecreate