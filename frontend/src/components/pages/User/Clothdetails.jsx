import { useParams,useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SwapTrack from "../../common/SwapTracker";
import {useState,useEffect} from "react";
import{Flag} from "lucide-react"
import axios from "axios";
import {motion} from "framer-motion"
export default function ClothDetails() {

    const location=useLocation();
    const clothdata=location.state;
    const navigate=useNavigate();
    const[track,setTrack]=useState(null);
    const[showbox,setShowbox]=useState(false);
    const[reason,setReason]=useState("");

     const swapRequest=(item)=>{
      const user=JSON.parse(localStorage.getItem("user"))
      console.log(user);
      navigate(`/user/swapselect`,{
        state:{
          receiverId:item.userId,
          receiverListingId:item.id,
          senderId:user._id,
        }
      });

    }
    useEffect(()=>{
      const fetchtrack=async()=>{
        const user=JSON.parse(localStorage.getItem("user"));
        try{
          const res=await axios.get(`https://cloth-exchange-backend.onrender.com/api/swap/swaptracking/${user._id}/${clothdata.id}`);
          setTrack(res.data[0].status);
          console.log(res.data[0].status);
        }catch(error){
          console.log(error)
        }
      }
      fetchtrack();

    },[])
    const sendReport=async(id)=>{
      const user=JSON.parse(localStorage.getItem("user"));
      try{
        const data=await axios.post(`https://cloth-exchange-backend.onrender.com/api/users/sendreport/${id}/${user._id}`,{reason});
        setShowbox(!showbox);
        alert("report has been send to admin,wait for the response");
      
      }catch(error){
        console.log(error);
      }
    }
  return (
    <div className=" h-screen pt-5 bg-[#f9faf7]">

      <div className="max-w-7xl mx-auto p-6 relative z-10">
           
        <div className="grid lg:grid-cols-2 gap-10">
          <div>

            <img
              src={`https://cloth-exchange-backend.onrender.com${clothdata.image}`}
              alt=""
              className="
                w-full
                h-[450px]
                object-cover
                rounded-2xl
              "
            />

          

          </div>

        

          <div>

            <div className="flex justify-between items-start">

              <div>
                <h1 className="text-4xl font-bold">
                  {clothdata.title}
                </h1>

                <p className="text-gray-500 ">
                {clothdata.brand}
                </p>
              </div>
             
              <div className="flex flex-col ">
                 <div className="flex  items-center text-[24px] justify-ends">
                original price: <span className="text-[28px] font-bold text-green-700">
                {clothdata.originalPrice}
              </span>
             
              </div>


              <h1>estimated value:{clothdata.estimatedValue}</h1>
             
              </div>
               
             

            </div>

            {/* Tags */}

            <div className="flex flex-wrap gap-3 mt-2">

              <span className="bg-gray-100 px-4 py-1 rounded-full">
               {clothdata.category}
              </span>

              <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full">
                {clothdata.condition}
              </span>

              <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full">
                {clothdata.size}
              </span>
            <button onClick={()=>setShowbox(!showbox)} className="bg-red-100 ml-60 text-yellow-700 px-4 py-1 rounded-full">report</button>

            </div>

            {/* Description */}

            <div className="mt-2">

              <h2 className="text-xl font-semibold mb-1">
                Description
              </h2>

              <p className="text-gray-600 leading-relaxed">Premium Nike hoodie in excellent condition.used only a few times and maintained
                properly.
              </p>

            </div>

            {/* Cloth Details */}

            <div className="mt-2">

              <h2 className="text-xl font-semibold mb-2">Clothing Details</h2>

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-white p-2 rounded-xl">
                  <p className="text-gray-500">
                    Size
                  </p>

                  <p className="font-semibold">
                   {clothdata.size}
                  </p>
                </div>

                <div className="bg-white p-2 rounded-xl">
                  <p className="text-gray-500">
                    Color{track}
                  </p>

                  <p className="font-semibold">
                   {clothdata.color}
                  </p>
                </div>

                <div className="bg-white p-2 rounded-xl">
                  <p className="text-gray-500">
                    Material
                  </p>

                  <p className="font-semibold">
                    {clothdata.material}
                  </p>
                </div>

                <div className="bg-white p-2 rounded-xl">
                  <p className="text-gray-500">
                    Years Used
                  </p>

                  <p className="font-semibold">
                    {clothdata.yearsUsed}
                  </p>
                </div>

              </div>

            </div>

            <div className="flex gap-4 mt-4">

              <button
                 onClick={()=>swapRequest(clothdata)} className="flex-1  bg-gradient-to-r from-green-700 to-green-800 text-white py-3 rounded-xl font-medium " >
                Request Swap
              </button>

              <button onClick={()=>navigate(`/user/viewuserprofile/${clothdata.userId._id}`)}
                className=" flex-1 border border-green-700 text-green-700 py-3 rounded-xl font-medium">
                View Profile
              </button>

            </div>

          </div>

        </div>

      </div>
      <div className="relative">
        {track==="completed"?(<div className="text-center text-4xl font-bold bg-green-700 bg-clip-text text-transparent pt-10">swap completed</div>):(
          <SwapTrack status={track}/>)}
      

      </div>
      {showbox &&(
     

      <motion.div initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}} transition={{duration:0.3}} className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden absolute text-center ml-[420px] -mt-[480px] z-50">

     
         <div className="p-8">
          <div className="mb-6">

            <label className="block text-gray-700 font-semibold mb-3">
              Reason for Report
            </label>

            <textarea
              rows={6}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why you're reporting this listing..."
              className="  w-full  border  border-gray-300 rounded-2xl p-4  outline-none focus:ring-2 focus:ring-red-500  resize-none  transition"
            ></textarea>

            <p className="text-sm text-gray-500 mt-2">
              Please provide as much detail as possible. False reports may be
              reviewed by the administrator.
            </p>

          </div>

          <div className="flex justify-end gap-4">

            <button onClick={()=>setShowbox(!showbox)}
              type="button"
              className="  px-6  py-3  rounded-xl  border  border-gray-300  hover:bg-gray-100  transition
              "
            >
              Cancel
            </button>

            <button
              onClick={()=>sendReport(clothdata.id)} className=" px-8  py-3  rounded-xl  bg-red-600  hover:bg-red-700  text-white font-semibold shadow-lg transition"
            >
              Submit Report
            </button>

          </div>
          </div>
      </motion.div>

    
      )}

    </div>
  );
}