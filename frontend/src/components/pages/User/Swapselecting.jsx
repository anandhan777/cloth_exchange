import React from 'react'
import{useEffect,useState} from "react"
import axios from "axios"
import { useLocation ,useNavigate} from 'react-router-dom';

function Swapselecting() {
   const location=useLocation();
    const[cloths,setCloths]=useState([]);
    const navigate=useNavigate();
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

    const SwapSelect=async(id)=>{
        const swapdata=location.state;
        const payload={...swapdata,senderListingId:id}
         console.log(payload);
        try{
        const res=await axios.post("http://localhost:5000/api/users/sendswaprequest",payload);
        console.log(res.data);
        }catch(error){
            console.log(error);
        }

    }
   
  return (
    <div className="px-30">
        <div className="w-full flex flex-col gap-4">
  {cloths.map((cloth) => (
    <div
      key={cloth._id}
      className="w-full bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4 hover:shadow-lg transition"
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
          <button onClick={()=>{SwapSelect(cloth._id),navigate("/user/viewlisting"),alert("request send successfully")}} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            swap with
          </button>
          
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  )
}

export default Swapselecting