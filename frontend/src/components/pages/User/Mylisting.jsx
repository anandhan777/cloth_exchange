import React from 'react'
import{useEffect,useState} from "react"
import axios from "axios"
import gsap from 'gsap';
import {motion} from "framer-motion"


function Mylisting() {

    const[cloths,setCloths]=useState([]);
    
    useEffect(()=>{
        const fetchCloths=async()=>{
            try{
            const token=localStorage.getItem('token');
            const res=await axios.get("http://localhost:5000/api/users/mylisting",{headers:{Authorization:`Bearer ${token}`}});
            setCloths(res.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchCloths();
    },[]);
    useEffect(()=>{
      gsap.fromTo('.title',{
        opacity:0,
        y:50,
      },{opacity:1,
        y:0,
        duration:0.3,
      
      })
      gsap.fromTo('.list-container',{
        opacity:0,
      },{opacity:1,
        duration:0.3,
        stagger:0.2,
      })
    })

  const itemdelete=async(id)=>{
    try{
      const res=await axios.delete(`http://localhost:5000/api/users/deletemyitem/${id}`);
      setCloths(pre=>pre.filter((m)=>m._id!==id));
    }catch(error){
      console.log(error);
    }
  }
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.7}} className="px-30 h-screen  bg-[#faf9f5]">
      <h1 className='title text-2xl text-green-700 text-center font-semibold py-3'>select your item to swap with</h1>
        <div className="w-full flex flex-col gap-4 bg-[#faf9f5]">
  {cloths.map((cloth) => (
    <div
      key={cloth._id}
      className="list-container w-full bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-2 hover:shadow-lg transition"
    >
      {/* Image */}
      <div className="w-full md:w-48 h-48 flex-shrink-0">
        <img
          src={`http://localhost:5000${cloth.image}`}
          alt={cloth.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {cloth.title}
          </h2>

          <div className="grid grid-cols-3 grid-rows-3 gap-2 mt-3 text-gray-600">
            <p>
              <span className="font-medium">Category:</span>{" "}
              {cloth.category}
            </p>

            <p>
              <span className="font-medium">Size:</span>{" "}
              {cloth.size}
            </p>
            <p>
              <span className="font-medium">brand:</span>{" "}
              {cloth.brand}
            </p>
            <p>
              <span className="font-medium">material:</span>{" "}
              {cloth.material}
            </p>
            <p>
              <span className="font-medium">Years used:</span>{" "}
              {cloth.yearsUsed}
            </p>
            <p>
              <span className="font-medium">Times worn:</span>{" "}
              {cloth.timesWorn}
            </p>
            

            <p>
              <span className="font-medium">Condition:</span>{" "}
              {cloth.condition}
            </p>
            <p>
              <span className="font-medium">Original price:</span>{" "}
              {cloth.originalPrice}
            </p>

            
          </div>
          
          <p className="mt-3 text-gray-500">
            <span className="font-medium">Color:</span>{" "}
            {cloth.color}
          </p>
        </div>

        <div className="flex justify-end mt-4 gap-5">
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            update Details
          </button>
          <button onClick={()=>itemdelete(cloth._id)} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </motion.div>
  )
}

export default Mylisting