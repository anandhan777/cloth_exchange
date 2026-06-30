import React from 'react'
import Sidebar from '../../sidebar/Usersidebar'
import {useState,useEffect} from "react"
import axios from "axios"
import userbg from "../../../assets/User_image/userhome.png"
import header from "../../../assets/Home_image/header.png"
import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom'


function Userpage() {
  const navigate=useNavigate();
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(!user.isProfile){
      navigate("/user/profilecreate")    
    }
  },[])
    
  return (
    <motion.div initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} transition={{duration:0.5}} className="bg-gradient-to-r from-[#e0fdd4] to-white">
    <div>
     <section className="h-[70vh] relative" >
        <img
          src={userbg} // replace with your image path
          alt="SwapIt Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center text-center text-white">
          <h2 className="text-4xl font-semibold mb-4">Welcome Back to SwapIt</h2>
          <p className="max-w-xl text-lg">
            Exchange clothes, reduce waste, and make fashion sustainable.
          </p>
          <button className="mt-6 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
            Start Swapping
          </button>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <h3 className="font-semibold text-green-900">List Your Items</h3>
          <p className="text-green-700 text-sm mt-2">Upload clothes you want to exchange.</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <h3 className="font-semibold text-green-900">Browse & Discover</h3>
          <p className="text-green-700 text-sm mt-2">Find new styles from other users.</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <h3 className="font-semibold text-green-900">Swap & Connect</h3>
          <p className="text-green-700 text-sm mt-2">Send swap requests and chat securely.</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <h3 className="font-semibold text-green-900">Sustainable Impact</h3>
          <p className="text-green-700 text-sm mt-2">Track your eco-friendly contributions.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-green-800 border-t border-green-200">
        © 2026 SwapIt — Making Fashion Sustainable 🌿
      </footer>
    </div></motion.div>
  )
}

export default Userpage