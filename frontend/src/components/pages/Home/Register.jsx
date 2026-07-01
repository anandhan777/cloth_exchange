import React from 'react'
import logo1 from '../../../assets/Home_image/logo1.png'
import { NavLink,useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import axios from 'axios'
import {motion} from "framer-motion"
import google from "../../../assets/Home_image/google.png"
function Register() {
  const navigate=useNavigate();
  const { register, handleSubmit,formState:{errors} } = useForm();
    const onSubmit=async(data)=>{
        try{
            console.log(data);
            const res=await axios.post("https://cloth-exchange-backend.onrender.com/api/users/register",data);
            console.log("login successfull");
        }catch(error){
            console.log(error);
            
        }
    }



  return (
    <div className="bg-[#FDF6EC] h-[740px] flex flex-col">
        <div className="flex items-center -mt-6 -pt-2" >
            <img src={logo1} alt="logo" className='w-50 h-38'/>
      
      <div className="">
        <NavLink to="/" className=" ml-[750px] px-3 py-2 hover:bg-green-600 hover:text-white duration-300 rounded-full font-semibold">Home</NavLink>
        <NavLink to="/user" className="px-3 py-2  hover:bg-green-600 hover:text-white duration-300 rounded-full font-semibold">About</NavLink>
        <NavLink to="/admin" className="px-3 py-2 hover:bg-green-500 hover:text-green-900 duration-300 rounded-full font-semibold">Contact</NavLink>
        <NavLink to="/mentors" className="px-3 py-2 hover:bg-green-500 hover:text-green-900 duration-300 rounded-full font-semibold">feature</NavLink>
       <NavLink to="/login"> <button  className="bg-white shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-green-900 hover:text-white text-green-900 duration-400 w-[100px] py-2 px-4 rounded-3xl hover:text-blue-900 ml-4" style={{border:"1px solid #00c3ff",boxshadow:"0 4px 12px rgba(0, 0, 255, 0.6)"}}>Login</button> </NavLink>
        <NavLink to="/register"> <button  className="bg-green-900 shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-white hover:text-green-900 text-white w-[100px] py-2 px-4 rounded-3xl" style={{border:"1px solid #00c3ff"}}>Sign Up</button> </NavLink>
      </div>
    </div>
    <motion.div initial={{opacity:0,scale:0.4}} animate={{opacity:1,scale:1}} transition={{duration:0.4}} className="border-2 pt-8 border-green-900 rounded-2xl w-[450px] h-[470px] ml-[550px] mt-10 flex flex-col  items-center bg-white shadow-2xl ">
        <h1 className="text-3xl font-bold pb-8">Register</h1>
        <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center '>
        <input type="text" placeholder="enter you name" {...register("name",{required:"Name is required"})} className=" pl-2 border-2 border-gray-500 w-[400px] h-12 rounded-full "/>
        {errors.name && <p className="text-green-700">{errors.name.message}</p>}
        <input type="email" placeholder="enter you email" {...register("email",{required:"Email is required", pattern: /^\S+@\S+$/i})} className=" pl-2 border-2 border-gray-500 w-[400px] h-12 rounded-full mt-6"/>
        {errors.email && <p className="text-green-700">{errors.email.message}</p>}
        <input type="password" placeholder="enter your password" {...register("password",{required:"Password is required", minLength: 6})} className="pl-2 border-2 border-gray-500 w-[400px] h-12 rounded-full mt-6"/>
        {errors.password && <p className="text-green-700">{errors.password.message}</p>}
        <NavLink to="/forgot-password">
         
        </NavLink>
        <button onClick={()=>navigate("/login")} className="bg-gradient-to-r from-green-900 to-green-700 mt-4 text-white w-[200px] py-2 px-4 rounded-3xl hover:bg-green-700">Register</button>
        <p className="text-[16px] text-gray-600 ml-1">if you already have an account, <NavLink to="/login" className="text-blue-500 hover:underline">login here</NavLink></p>
         <button onClick={()=>{window.location.href="https://cloth-exchange-backend.onrender.com/api/auth/google"}}
                  className="bg-white flex items-center mt-4  border-2 border-green-900 text-green-900 w-[200px] py- px-1 rounded-3xl hover:bg-gray-200"><img src={google} className="w-10 h-10"/>login with google</button>
        </form>
    </motion.div>
    </div>
  )
}

export default Register