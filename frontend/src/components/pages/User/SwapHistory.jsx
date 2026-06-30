import React from "react";
import {
  Calendar,
  CheckCircle,
  ArrowLeftRight,
  Star,
  MessageCircle,
} from "lucide-react";
import{useState,useEffect} from "react"
import axios from "axios"
import {motion} from "framer-motion";
import gsap from "gsap";


export default function SwapHistory() {
    const[swaps,setSwaps]=useState([]);
     const user=JSON.parse(localStorage.getItem("user"));
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"));
        const fetchSwap=async()=>{
        try {
           const res=await axios.get(`http://localhost:5000/api/users/usercompletedswaps/${user._id}`);
           console.log(res.data)
            setSwaps(res.data);
        } catch (error) {
            console.log(error);      
        }
    }
    fetchSwap();
    },[])
    useEffect(()=>{
      gsap.fromTo(".list-container",{
        y:50,opacity:0},{y:0,opacity:1,duration:0.6,stagger:0.3}
      )
    },[])
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header */}

      <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 rounded-3xl p-6 text-white shadow-lg">

        <motion.h1 initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.6}} className="text-4xl font-bold">
          Swap History
        </motion.h1>

        <motion.p initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.6}} className="mt-3 text-blue-100 text-lg">
          View all your successfully completed clothing swaps.
        </motion.p>

      </div>

      {/* Summary Cards */}

      {/* <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-gray-500">Total Swaps</h3>
          <h2 className="text-4xl font-bold mt-2 text-blue-600">24</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-gray-500">Items Received</h3>
          <h2 className="text-4xl font-bold mt-2 text-green-600">24</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-gray-500">Success Rate</h3>
          <h2 className="text-4xl font-bold mt-2 text-purple-600">100%</h2>
        </div>

      </div>

      History */}

      <div className="mt-10 space-y-8">

        {swaps.map((swap) => (

          <div
            key={swap._id}
            className="list-container bg-white rounded-3xl shadow-md p-4"
          >

            <div className="flex justify-between items-center mb-4">

              <div>
{/* 
                <h2 className="text-2xl font-bold">
                  {swap._id}
                </h2> */}

                <p className="text-gray-500">
                  Swapped with {swap.receiverId._id===user._id?swap.senderId.name:swap.receiverId.name}
                </p>

              </div>

              <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">

                <CheckCircle size={18} />

                {swap.status}

              </div>

            </div>

            <div className="grid lg:grid-cols-3 items-center gap-8">

              {/* My Item */}

              <div className="border-2 border-gray-400 rounded-2xl p-5">

                <p className="text-sm text-gray-500 mb-3">
                  You Gave
                </p>
              <div className="flex gap-10">
                <img
                  src={`http://localhost:5000${swap.itemoffered?.image}`}
                  alt=""
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <h3 className="font-bold text-lg mt-4">
                  {swap.itemoffered?.title}
                </h3>
                </div>

              </div>

              {/* Swap Icon */}

              <div className="flex flex-col items-center">

                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

                  <ArrowLeftRight
                    className="text-green-600"
                    size={30}
                  />

                </div>

                <p className="text-green-600 font-semibold mt-3">
                  Successfully Swapped
                </p>

              </div>

              {/* Received */}

              <div className="border-2 border-gray-400 rounded-2xl p-5">

                <p className="text-sm text-gray-500 mb-3">
                  You Received
                </p>
               <div className="flex gap-10">
                <img
                  src={`http://localhost:5000${swap.itemreceived?.image}`}
                  alt=""
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <h3 className="font-bold text-lg mt-4">
                  {swap.itemreceived?.title}
                </h3></div>

                

              </div>

            </div>

            {/* Bottom */}

            <div className="flex flex-wrap justify-between items-center mt-8 border-t pt-4">

              <div className="flex items-center gap-2 text-gray-600">

                <Calendar size={18} />

                Completed on {swap.createdAt}

              </div>

              <div className="flex items-center gap-2">

                {[...Array(swap.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl transition">

                <MessageCircle size={18} />

                View Conversation

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}