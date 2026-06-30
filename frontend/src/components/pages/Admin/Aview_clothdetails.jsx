import { useParams,useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SwapTrack from "../../common/SwapTracker";
import {useState,useEffect} from "react";
import axios from "axios";
export default function Aview_clothdetails() {

    const location=useLocation();
    const clothdata=location.state;
    const navigate=useNavigate();
    const[track,setTrack]=useState(null);

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
          const res=await axios.get(`http://localhost:5000/api/swap/swaptracking/${user._id}/${clothdata.id}`);
          setTrack(res.data[0].status);
          console.log(res.data[0].status);
        }catch(error){
          console.log(error)
        }
      }
      fetchtrack();

    },[])
  return (
    <div className=" h-screen pt-35 bg-[#faf9f5] ">

      <div className="max-w-7xl mx-auto p-6">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Images Section */}

          <div>

            <img
              src={`http://localhost:5000${clothdata.image}`}
              alt=""
              className="
                w-full
                h-[450px]
                object-cover
                rounded-2xl
              "
            />

          
          </div>

          {/* Details */}

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

              <span className="text-3xl font-bold text-green-700">
                {clothdata.originalPrice}
              </span>

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
                 onClick={()=>swapRequest(clothdata)} className="flex-1  bg-gradient-to-r from-green-900 to-[#2eaf7d] text-white py-3 rounded-xl font-medium " >
                Request Swap
              </button>

              <button
                className=" flex-1 border border-green-700 text-green-700 py-3 rounded-xl font-medium">
                View Profile
              </button>

            </div>

          </div>

        </div>

      </div>
     

    </div>
  );
}