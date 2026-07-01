import React from "react";
import {
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Trash2,
  ShieldAlert,
} from "lucide-react";
import{useState,useEffect} from "react"
import axios from "axios"
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom";
const reports = [
  {
    id: "#RPT-1001",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400",
    cloth: "Vintage Denim Jacket",
    seller: "John Doe",
    reporter: "Rahul",
    reason: "Misleading Description",
    date: "20 Jun 2026",
    status: "Pending",
    priority: "High",
  },
  {
    id: "#RPT-1002",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    cloth: "Black Hoodie",
    seller: "Emily",
    reporter: "Priya",
    reason: "Spam Listing",
    date: "18 Jun 2026",
    status: "Resolved",
    priority: "Medium",
  },
  {
    id: "#RPT-1003",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400",
    cloth: "Blue Shirt",
    seller: "Alex",
    reporter: "Kevin",
    reason: "Offensive Image",
    date: "16 Jun 2026",
    status: "Under Review",
    priority: "High",
  },
];

export default function ViewReports() {
    const[report,setReport]=useState([]);
    const[showbox,setShowbox]=useState(false);
    const[reportCollection,setReportCollection]=useState({total:0,pending:0,resolved:0});
    const[reason,setReason]=useState("");
    const[selectReport,setSelectReport]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchReports=async()=>{
            try {
              const[res,rpc]=await Promise.all([axios.get(`https://cloth-exchange-backend.onrender.com/api/admin/viewreports`),
                axios.get(`https://cloth-exchange-backend.onrender.com/api/admin/reportcollection`)]);
              setReport(res.data);
              setReportCollection(rpc.data);
              console.log(rpc.data)
              console.log(res.data)
            } catch (error) {
                console.error(error);
                
            }
        }
        fetchReports();
    },[])
const deleteListing=async(itemId,reportId)=>{
    try {
        await axios.delete(`https://cloth-exchange-backend.onrender.com/api/admin/deleteitem/${itemId}`);
        await axios.delete(`https://cloth-exchange-backend.onrender.com/api/admin/deletereport/${reportId}`)
        alert("item deleted");

    } catch (error) {
        console.error(error);
        
    }

}
const deleteReport=async(reportId)=>{
    try{
    await axios.put(`https://cloth-exchange-backend.onrender.com/api/admin/deletereport/${reportId}`,{status:"Resolved"});
    setReport(prev=>prev.filter(m=>m._id!==reportId));
    alert("report resolved")
    }catch(error){
        console.log(error);
    }

}
const sendWarning=async(id)=>{
await axios.post(`https://cloth-exchange-backend.onrender.com/api/users/sendwarning/${id}`,{reason});
    alert("send warning successfully");
    setShowbox(!showbox);
}  
  return (
    <div className="bg-[#faf9f5]  min-h-screen p-8 pt-20">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Reports Management
          </h1>

        
        </div>

        <div className="relative">

          <Search className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search reports..."
            className="pl-10 pr-4 py-3 rounded-xl bg-white shadow outline-none w-72"
          />

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl p-6 shadow">
          <AlertTriangle className="text-red-500 mb-4" size={32} />
          <h2 className="text-3xl font-bold">{reportCollection.total}</h2>
          <p className="text-gray-500">Total Reports</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <Clock className="text-yellow-500 mb-4" size={32} />
          <h2 className="text-3xl font-bold">{reportCollection.pending}</h2>
          <p className="text-gray-500">Pending</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <CheckCircle className="text-green-500 mb-4" size={32} />
          <h2 className="text-3xl font-bold">{reportCollection.resolved}</h2>
          <p className="text-gray-500">Resolved</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <ShieldAlert className="text-blue-500 mb-4" size={32} />
          <h2 className="text-3xl font-bold">18</h2>
          <p className="text-gray-500">High Priority</p>
        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-2xl shadow p-5 mb-8 flex gap-4">

        <select className="border rounded-lg px-4 py-2">
          <option>All Status</option>
          <option>Pending</option>
          <option>Resolved</option>
          <option>Under Review</option>
        </select>

        <select className="border rounded-lg px-4 py-2">
          <option>All Reasons</option>
          <option>Spam</option>
          <option>Fake Listing</option>
          <option>Offensive Content</option>
        </select>

        <select className="border rounded-lg px-4 py-2">
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>

      </div>

      {/* Report Cards */}

      <div className="space-y-6">

        {report.map((r) => (

          <div
            key={r._id}
            className="bg-white rounded-2xl shadow p-6"
          >

            <div className="grid lg:grid-cols-6 gap-6 items-center">

              {/* Image */}

              <img
                src={`https://cloth-exchange-backend.onrender.com${r.itemId.image}`}
                className="h-36 w-36 object-cover rounded-xl"
                alt=""
              />

              {/* Details */}

              <div className="lg:col-span-3 space-y-2">

                <h2 className="text-2xl font-bold">
                  {r.itemId.title}
                </h2>

                <p>
                  <span className="font-semibold">Report ID:</span>{" "}
                  {r._id}
                </p>

                <p>
                  <span className="font-semibold">Seller:</span>{" "}
                  {r.itemId.userId.name}
                </p>

                <p>
                  <span className="font-semibold">Reported By:</span>{" "}
                  {r.userId.name}
                </p>

                <p>
                  <span className="font-semibold">Reason:</span>{" "}
                  {r.reason}
                </p>

                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {r.createdAt}
                </p>

              </div>

              {/* Status */}

              <div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    report.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  Resolved
                </span>

                <div className="mt-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      report.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {report.priority} Priority
                  </span>

                </div>

              </div>

              {/* Actions */}

              <div className="space-y-3">

                <button onClick={()=>navigate(`/admin/reviewitem/${r.itemId._id}`)}className="w-full border-2 flex items-center justify-center gap-2 text-blue-400 border-blue-400 bg-white py-2 rounded-lg">
                  <Eye size={18} />
                  View
                </button>

                <button onClick={()=>{setShowbox(!showbox),setSelectReport(r._id)}} className="w-full border-2 border-yellow-500 text-yellow-600 bg-white py-2 rounded-lg">
                  Warn Seller
                </button>

                <button onClick={()=>deleteListing(r.itemId._id,r._id)}className="w-full border-2 flex items-center justify-center gap-2 border-red-400 text-red-400 bg-white py-2 rounded-lg">
                  <Trash2 size={18} />
                  Remove Listing
                </button>

                <button onClick={()=>deleteReport(r._id)} className="w-full border-2  border-green-600 text-green-700 bg-white py-2 rounded-lg">
                  Resolve
                </button>

              </div>

            </div>
             {showbox && selectReport===r._id &&(
     
      
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
              className="  w-full  border  border-gray-300 rounded-2xl p-4  outline-none focus:ring-2 focus:ring-green-500  resize-none  transition"
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
              onClick={()=>sendWarning(r.itemId.userId._id)} className=" px-8  py-3  rounded-xl  bg-green-600  hover:bg-green-700  text-white font-semibold shadow-lg transition"
            >
              Submit Report
            </button>

          </div>
          </div>
      </motion.div>

    
      )}


          </div>

        ))}

      </div>
     
      
    </div>
  );
}