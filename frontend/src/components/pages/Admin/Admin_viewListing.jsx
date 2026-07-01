import React from 'react'
import{useState,useEffect} from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

function Admin_viewListing() {
     const [list,setList]=useState([]);
     const[search,setSearch]=useState("");
     const navigate=useNavigate();
    useEffect(()=>{
        const fetchListing=async()=>{
            try{
                const res=await axios.get("https://cloth-exchange-backend.onrender.com/api/admin/viewlisting");
                setList(res.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchListing();
    },[])
     const collectdata=(item)=>{
      navigate(`/admin/viewclothdetails`,{
        state:{
          id:item._id,
          name:item.userId.name,
          userId:item.userId,
          title:item.title,
          category:item.category,
          brand:item.brand,
          condition:item.condition,
          originalPrice:item.originalPrice,
          yearsUsed:item.yearsUsed,
          timesWorn:item.timesWorn,
          size:item.size,
          color:item.color,
          material:item.material,
          gender:item.gender,
          image:item.image,
          interestedCategories:item.interestedCategories,
          preferredSizes:item.preferredSizes,
          city:item.city,
          state:item.state,
          estimatedValue:item.estimatedValue,
          status:item.status,
        }
      })

    }
     const searchList=async()=>{
      const res=await axios.get(`https://cloth-exchange-backend.onrender.com/api/users/search?search=${search}`);
      setList(res.data);
    }
  return (
    <div className="bg-[#faf9f5] ">
      <h1 className="text-green-800 text-4xl text-center pt-22 font-semibold">All listed items</h1>
       <div className="relative flex pt-10 mx-20">
                  
                    <input
                      type="text"
                      placeholder="Search feedback..."
                      value={search}
                      
                      onChange={(e)=>setSearch(e.target.value)}
                      className="w-full border rounded-full py-3 pl-10 pr-4 border-transparent ring-gray-300 relative bg-white  ring-2 focus:ring-green-600"
                    />
                    <FaSearch onClick={searchList} className="text-5xl bg-gradient-to-r from-green-700 to-green-500 rounded-full font-semibold text-white p-2 text-right "/>
      
                  </div>
          
    
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      h-screen
      gap-6
      pt-10
      px-20
       "
    >
      
      {list.map((item) => (
        <div
          key={item._id}
          className="
          bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition h-[440px]"
        >
          <div>
          {/* Image */}
          <img
            src={`https://cloth-exchange-backend.onrender.com${item.image}`}
            alt={item.title}
            className="w-full h-54 object-cover relative"
          /></div>
    
          {/* Content */}
          <div className="p-4">
    
            <div className="flex justify-between">
              <h2 className="font-bold text-lg">
                {item.title}
              </h2>
    
              <span className="font-bold text-green-700">
                ₹{item.estimatedValue}
              </span>
            </div>
    
            <p className="text-gray-500">
              {item.brand}
            </p>
    
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {item.category}
              </span>
    
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {item.size}
              </span>
    
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                {item.condition}
              </span>
            </div>
    
            <div className="mt-4 text-sm text-gray-500">
              {item.city}, {item.state}
            </div>
    
            <div className="flex gap-2 mt-4">
    
              <button onClick={()=>collectdata(item)}
                className="flex-1  bg-gradient-to-r from-green-900 to-[#2eaf7d] text-white py-2 rounded-xl">
                View details
              </button>
    
            
    
            </div>
    
          </div>
        </div>
      ))}
    </div>
    </div>
    
  )
}

export default Admin_viewListing