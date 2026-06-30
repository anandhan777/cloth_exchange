import React from "react";
import {useState,useEffect} from "react"
import axios from "axios"
import {X} from "lucide-react";
import {
  Search,
  Eye,
  MessageSquareWarning,
} from "lucide-react";

const Admin_viewFeedback = () => {
    const[feedbacks,setFeedbacks]=useState([]);


  useEffect(()=>{
    const fetchFeedback=async()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/admin/viewfeedback");
            setFeedbacks(res.data);

        }catch(error){
            console.error(error);
        }
    }
    fetchFeedback();
  },[])
  const deleteFeedback=async(id)=>{
  
    try{
        const res=await axios.delete(`http://localhost:5000/api/admin/deletefeedback/${id}`);
        setFeedbacks(pre=>pre.filter(m=>m._id!==id))
    }catch(error){
        console.log(error);
    }
  }

  const isRead=async(id)=>{
    await axios.put(`http://localhost:5000/api/admin/readfeedback/${id}`);
     setFeedbacks(pre=>pre.map(m=>m._id!==id))
    console.log("msg readed");
    
  }
  const getPriorityColor = (priority) => {

    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5]  p-6 pt-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-[#eefde7] rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <MessageSquareWarning
              size={30}
              className="text-green-500"
            />

            <div>
              <h1 className="text-2xl font-bold">
                Feedback Reports
              </h1>

              <p className="text-slate-500">
                Review and manage user feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search feedback..."
                className="w-full border rounded-lg py-3 pl-10 pr-4"
              />
            </div>

            <select className="border rounded-lg px-4 py-3">
              <option>All Status</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {feedbacks.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* Left Side */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.subject}
                  </h2>

                  <p className="text-slate-500 mt-1">
                    Submitted by {item.userId?.name}
                  </p>

                  <p className="text-sm text-slate-400">
                    {item.description}
                  </p>

                  <div className="flex gap-2 mt-3 flex-wrap">

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      {item.category}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(
                        item.priority
                      )}`}
                    >
                      {item.priority}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex justify-end">
               
                <div className="flex items-center gap-3">
                  <p className="text-sm text-slate-500">
                    {/* {Date(item.createdAt)} */}
                  </p>
                 
                  <button onClick={()=>isRead(item._id)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Eye size={18} />
                    read
                  </button>
                  <button onClick={()=>deleteFeedback(item._id)}><X size={20} className="flex -mt-15"/></button>
                </div>
                </div>
                

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Admin_viewFeedback;