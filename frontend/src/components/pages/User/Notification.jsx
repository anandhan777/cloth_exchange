import { useState,useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("incoming");
  const [incoming,setIncoming]=useState([]);
  const [outgoing,setOutgoing]=useState([]);
  const [accept,setAccept]=useState(true);


  const navigate=useNavigate();
 

  useEffect(()=>{
    
    const fetchincoming=async()=>{
        try{
            const token=localStorage.getItem("token");
            const res=await axios.get("https://cloth-exchange-backend.onrender.com/api/users/incomingrequest",{headers:{Authorization:`Bearer ${token}`}});
            setIncoming(res.data);
            console.log(res.data)
        }catch(error){
            console.log(error);
        }
    }
    const fetchoutgoing=async()=>{
        try{
            const token=localStorage.getItem("token");
            const res=await axios.get("https://cloth-exchange-backend.onrender.com/api/users/outgoingrequest",{headers:{Authorization:`Bearer ${token}`}});
            setOutgoing(res.data);
            console.log(res.data);

        }catch(error){
            console.log(error);
        }
    }

    fetchincoming();
    fetchoutgoing();
  },[])
  useEffect(()=>{
     gsap.fromTo('.list-container',{
        opacity:0,
      },{opacity:1,
        duration:0.5,
        stagger:0.2,
      })
     gsap.fromTo('.title',{
        x:-50,
        opacity:0,
      },{opacity:1,
        x:0,
        duration:0.5,
        })
     gsap.fromTo('.btn',{
        scale:0,
        opacity:0,
      },{opacity:1,
        scale:1,
        duration:0.3,
        })
  })
  
 const removeR=async(id)=>{
    const res=await axios.delete(`https://cloth-exchange-backend.onrender.com/api/users/removerequest/${id}`);
    // const updatedrequest=outgoing.filter((m,_)=>m._id!==id);
    setOutgoing(prev=>prev.filter(m=>m._id!==id
    ));

  }
  const startChat=async(id)=>{
    try{
      const data=await axios.put(`https://cloth-exchange-backend.onrender.com/api/swap/startchat/${id}`,{status:"chatting"});
      console.log(data.data);
    }catch(error){
      console.log(error);

    }
  }

// const handleClick=async(id)=>{
//   if (accept[id]) {
//       await acceptRequest(id);
//        setAccept(prev => ({ ...prev, [id]: true }));
//     } else {
//       await Cancel(id);
//        setAccept(prev => ({ ...prev, [id]: false }));
//     }
   
// }
  const acceptRequest=async(id,sid,rid)=>{
    try{
    const res=await axios.put(`https://cloth-exchange-backend.onrender.com/api/swap/acceptrequest/${id}/${sid}/${rid}`,{status:"accepted",CStatus:"Reserved"});
    const updateswap=res.data.data;
    console.log(res);
    setIncoming((prev)=>prev.map((req)=>req._id===id ? {...req,status:updateswap.status}:req));
    alert("request accepted");
    }catch(error){
      console.log(error);
    }

  }
  const Cancel=async(id)=>{
    try{
    const res=await axios.put(`https://cloth-exchange-backend.onrender.com/api/swap/cancelrequest/${id}`);
       const updateswap=res.data.data;
    console.log(res);
   setIncoming((prev)=>prev.map((req)=>req._id===id ? {...req,status:updateswap.status}:req));
   alert("request cancelled");
    }catch(error){
      console.log(error);
    }

  }

  const rejectRequest=async(id)=>{
    try{
      const res=await axios.put(`https://cloth-exchange-backend.onrender.com/api/swap/rejectrequest/${id}`);
      const updateswap=res.data.data;
      console.log(res);
      setIncoming((prev)=>prev.map((req)=>req._id===id ?{...req,status:updateswap?.status}:req));
       alert("request rejected");
      
    }catch(error){
      console.log(eror);
    }
  }
  return (
    <div className="p-6 bg-[#faf9f5] min-h-screen">
      <div className="mb-8">
        <h1 className=".title text-3xl font-bold text-gray-800">
          Swap Notifications
        </h1>

        <p className="title text-gray-500 mt-2">
          Manage incoming and outgoing swap requests
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("incoming")}
          className={`btn px-6 py-3 rounded-xl font-medium ${
            activeTab === "incoming"
              ? " bg-gradient-to-r from-green-900 to-[#2eaf7d] text-white"
              : "bg-white border"
          }`}
        >
          Incoming Requests
        </button>

        <button
          onClick={() => setActiveTab("outgoing")}
          className={`btn px-6 py-3 rounded-xl font-medium ${
            activeTab === "outgoing"
              ? " bg-gradient-to-r from-[#2eaf7d] to-green-900 text-white"
              : "bg-white border"
          }`}
        >
          Outgoing Requests
        </button>
      </div>

    
  {activeTab==="incoming" ? (
      <div className="space-y-5">
 {incoming.map((inco)=>  (
        <div key={inco._id} className="list-container bg-white rounded-2xl shadow-sm border p-5">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* User Details */}

            <div className="flex items-center gap-4">
{/* 
              <img
                src={}
                alt=""
                className="w-16 h-16 rounded-full"
              /> */}

              <div>
                <h3 className="font-semibold">
                  {inco.senderId.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {inco.createdAt}
                </p>

                <span className="text-xs text-green-600 font-medium">
                  Active User
                </span>
              </div>

            </div>

            {/* My Item */}

            <div className="flex gap-3">

              <img
                src={`https://cloth-exchange-backend.onrender.com${inco.receiverListingId?.image}`}
                alt=""
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div>
                <h4 className="font-semibold">
                  {inco.receiverListingId?.title}
                </h4>

                <p className="text-sm text-gray-500">
                  {inco.receiverListingId?.brand}
                </p>

                <p className="text-green-700 font-bold">
                  {inco.receiverListingId?.originalPrice}
                </p>
              </div>

            </div>

      

            <div className="flex gap-3">

              <img
                 src={`https://cloth-exchange-backend.onrender.com${inco.senderListingId?.image}`}
                alt=""
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div>
                <h4 className="font-semibold">
                  {inco.senderListingId?.title}
                </h4>

                <p className="text-sm text-gray-500">
                  {inco.senderListingId?.brand}
                </p>

                <p className="text-green-700 font-bold">
                  {inco.senderListingId?.originalPrice}
                </p>
              </div>

            </div>

            <div className="flex  justify-center items-center gap-3">

              <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm -ml-30 mr-20">
                {inco?.status}
              </span>

              
                <div className="flex w-50 gap-5">
                  <button className="w-full bg-gradient-to-r from-green-900 to-[#2eaf7d] text-white py-2 rounded-xl" 
                   onClick={()=>inco?.status==="Accepted"? Cancel(inco?._id):acceptRequest(inco?._id,inco?.senderListingId?._id,inco?.receiverListingId?._id)}>
                    {inco.status==="Accepted" ?"cancel":"Accept"}
                  </button>
                
                  {inco.status==="Pending" ? (
                  <button onClick={()=>rejectRequest(inco?._id)} className="w-full border border-green-500 text-green-500 py-2 rounded-xl hover:bg-green-600 hover:text-white">
                    Reject
                  </button>
                  ):(inco.status==="Rejected"?null:
                  (<button onClick={()=>{navigate(`/user/chat/${inco?._id}`,{state:inco?.senderId}),startChat(inco?._id)}} className="w-full border border-green-500 text-green-500 hover:bg-green-600 hover:text-white py-2 rounded-xl">
                    start chat
                  </button>)
                  )}
                  </div>
                 
               
              {/* {activeTab === "outgoing" && (
                <button className="w-full border border-gray-300 py-2 rounded-xl">
                  Cancel Request
                </button>
              )} */}
              

            </div>
            
            
          </div>
           
         
        </div>
        ))}
            
    </div>
    ):(
    <div className="space-y-5">
 {outgoing.map((out)=>  (
  <div key={out._id} className="bg-white rounded-2xl shadow-sm border p-5">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* User Details */}

            <div className="flex items-center gap-4">
{/* 
              <img
                src={}
                alt=""
                className="w-16 h-16 rounded-full"
              /> */}

              <div>
                <h3 className="font-semibold">
                  {out.senderId?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {out.createdAt}
                </p>

                <span className="text-xs text-green-600 font-medium">
                  Active User
                </span>
              </div>

            </div>

            {/* My Item */}

            <div className="flex gap-3">

              <img
                src={`https://cloth-exchange-backend.onrender.com${out.receiverListingId?.image}`}
                alt=""
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div>
                <h4 className="font-semibold">
                  {out.receiverListingId?.title}
                </h4>

                <p className="text-sm text-gray-500">
                  {out.receiverListingId?.brand}
                </p>

                <p className="text-green-700 font-bold">
                  {out.receiverListingId?.originalPrice}
                </p>
              </div>

            </div>

            {/* Requested Item */}

            <div className="flex gap-3">

              <img
                 src={`https://cloth-exchange-backend.onrender.com${out.senderListingId?.image}`}
                alt=""
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div>
                <h4 className="font-semibold">
                  {out.senderListingId?.title}
                </h4>

                <p className="text-sm text-gray-500">
                  {out.senderListingId?.brand}
                </p>

                <p className="text-green-700 font-bold">
                  {out.senderListingId?.originalPrice}
                </p>
              </div>

            </div>

            <div className="flex  justify-center items-center gap-3">

              <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm -ml-30 mr-20">
                {out.status}
              </span>

              
                <div className="flex w-50 gap-5">
                  <button onClick={()=>out.status==="Accepted" ? navigate(`/user/chat/${out._id}`,{state:out.receiverId}):removeR(out._id)} className="w-full bg-gradient-to-r from-green-900 to-[#2eaf7d] text-white py-2 rounded-xl">
                   {out.status==="Accepted" ?"start chat":"cancel"}
                  </button>

                 
                  </div>
               
              {/* {activeTab === "outgoing" && (
                <button className="w-full border border-gray-300 py-2 rounded-xl">
                  Cancel Request
                </button>
              )} */}
              

            </div>
            
            
          </div>
           
         
        </div>
        ))}
            
    </div>)}
  
           </div>
         
  );
}