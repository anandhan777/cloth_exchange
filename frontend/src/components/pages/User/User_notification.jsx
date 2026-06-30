
import {Bell, Globe, ShieldAlert,ArrowLeftRight, Clock,CheckCircle,} from "lucide-react";
import{useState,useEffect} from "react"
import axios from "axios"


export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState([]);
  const[global,setGlobal]=useState([]);
  const[warnings,setWarnings]=useState([]);
  const[swaps,setSwaps]=useState([]);

  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    const fetchNotification=async()=>{
        try {
            const res=await axios.get(`http://localhost:5000/api/users/usernotifications/${user._id}`);
            console.log(res.data);  
            setGlobal(res.data.global);
            setWarnings(res.data.warning);
            setSwaps(res.data.swap);     
        } catch (error) {
            console.log(error);    
        }
    }
    fetchNotification();
  },[])
  const deleteMsg=async(id)=>{
    try {
      const data=await axios.delete(`http://localhost:5000/api/users/deletenotify/${id}`);
      setActiveTab(prev=>prev.filter(m=>m._id!==id));
    } catch (error) {
      console.log(error);
      
    }
  }
  const tabs = [
    { id:1,
      key: global,
      label: "Global Messages",
      icon: <Globe size={18} />,
    },
    {id:2,
      key: warnings,
      label: "Warnings",
      icon: <ShieldAlert size={18} />,
    },
    {id:3,
      key: swaps,
      label: "Swap Requests",
      icon: <ArrowLeftRight size={18} />,
    },
  ];
  return (
    <div className="min-h-screen bg-[#faf9f5] p-8">
      <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-600 rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-4 rounded-full">
            <Bell size={34} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              Notifications
            </h1>
            <p className="text-blue-100 mt-2">
              Stay updated with swap requests, announcements and important alerts.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow mt-8 p-3 flex gap-3">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium
              ${
                activeTab === tab.key
                  ? "bg-green-700 text-white shadow"
                  : "hover:bg-slate-100 text-gray-600"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>

        ))}

      </div>
      <div className="mt-8 space-y-5">

        {activeTab.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex justify-between items-start"
          >

            <div className="flex gap-5">

              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">

                {activeTab === global && (
                  <Globe className="text-blue-600" />
                )}

                {activeTab === warnings && (
                  <ShieldAlert className="text-red-600" />
                )}

                {activeTab === swaps && (
                  <ArrowLeftRight className="text-green-600" />
                )}

              </div>

              <div>

                <div className="flex items-center gap-3">

                  <h2 className="text-lg font-bold">
                    {item.title}
                  </h2>

                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>

                </div>

                <p className="text-gray-600 mt-2">
                  {item.message}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">

                  <Clock size={16} />

                  {item.createdAt}

                </div>

              </div>

            </div>

            <button  onClick={()=>deleteMsg(item._id)} className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-5 py-2 rounded-xl flex items-center gap-2">

              <CheckCircle size={18} />

              Mark Read

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}