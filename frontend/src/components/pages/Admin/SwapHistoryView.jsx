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
import {motion} from "framer-motion"
import gsap from "gsap";

const swapHistory = [
  {
    id: "#SWP-1001",
    myItem: {
      name: "Blue Denim Jacket",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    },
    receivedItem: {
      name: "Black Hoodie",
      image:
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500",
    },
    partner: "Sarah Johnson",
    completedOn: "18 June 2026",
    rating: 5,
  },
  {
    id: "#SWP-1002",
    myItem: {
      name: "White Sneakers",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    receivedItem: {
      name: "Grey Sweatshirt",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500",
    },
    partner: "Michael Lee",
    completedOn: "12 June 2026",
    rating: 4,
  },
];

export default function SwapHistoryView() {
    const[swaps,setSwaps]=useState([]);
    useEffect(()=>{
        
        const fetchSwap=async()=>{
        try {
           const res=await axios.get(`https://cloth-exchange-backend.onrender.com/api/admin/swaphistory`);
           console.log(res.data)
            setSwaps(res.data);
        } catch (error) {
            console.log(error);      
        }
    }
    fetchSwap();
    },[])
    useEffect(()=>{
      gsap.fromTo(".history",{
        y:50,opacity:0},{y:0,opacity:1,duration:0.6,stagger:0.3}
      )
    },[])
  return (
    <div className="min-h-screen bg-[#faf9f5]  p-6 pt-20">

      {/* Header */}

      <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 rounded-3xl p-6 text-white shadow-lg">
 <motion.h1 initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.6}} className="text-4xl font-bold">
          Swap History
        </motion.h1>

        <motion.p initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.6}} className="mt-3 text-blue-100 text-lg">
          View all your successfully completed clothing swaps.
        </motion.p>


      </div>
      <div className="mt-10 space-y-8">

        {swaps.map((swap) => (

          <div
            key={swap._id}
            className="history bg-white rounded-3xl shadow-md p-2 px-4"
          >

            <div className="flex justify-between items-center mb-2">

              <div>
{/* 
                <h2 className="text-2xl font-bold">
                  {swap._id}
                </h2> */}

                <p className="text-gray-500">
                  Swapped between {swap.receiverId.name} and {swap.senderId.name}
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
                  src={`https://cloth-exchange-backend.onrender.com${swap.itemoffered?.image}`}
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
                  src={`https://cloth-exchange-backend.onrender.com${swap.itemreceived?.image}`}
                  alt=""
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <h3 className="font-bold text-lg mt-4">
                  {swap.itemreceived?.title}
                </h3></div>

                 

              </div>
              <div className="flex items-center gap-2 text-gray-600 -mt-4 mb-2">

                <Calendar size={18} />

                Completed on {swap.createdAt}

              </div>

            </div>

            {/* Bottom */}

         
         

             
{/* 
              <div className="flex items-center gap-2">

                {[...Array(swap.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div> */}
{/* 
              <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-xl transition">

                <MessageCircle size={18} />

                View Conversation

              </button> */}

            </div>

     

        ))}

      </div>

    </div>
  );
}