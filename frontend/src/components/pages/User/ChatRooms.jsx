// ChatSection.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {gsap} from "gsap"
import { scales } from "chart.js";


export default function ChatSection() {
  const [rooms, setRooms] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchroom = async () => {
      try {
        const res = await axios.get(
          `https://cloth-exchange-backend.onrender.com/api/swap/chatrooms/${user._id}`
        );
        setRooms(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchroom();
  }, [user._id]);
 useEffect(()=>{
  gsap.fromTo('.head',{
    x:50,
    opacity:0
  },{x:0,
    opacity:1,
    duration:0.5,
  }),
  gsap.fromTo('.para',{
    x:-50,
    opacity:0
  },{x:0,
    opacity:1,
    duration:0.5,
  }),
  gsap.to('.icon',{
    rotate:360,
    ease:"Infinity", 
    duration:0.8
  
  }),
  gsap.fromTo('.btn',{
    scale:0,
    opacity:0,
  },{opacity:1,
    scale:1,
    duration:0.4
  
  })
 })
  return (
    <div className="h-[670px] bg-gradient-to-br bg-[#faf9f5]  flex p-6">
      
      {/* Sidebar */}
      <div className="w-[350px] bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-green-800 to-emerald-500">
          <h1 className="text-2xl font-bold text-white">
            Messages
          </h1>
          <p className="text-green-100 text-sm mt-1">
            see your history swap
          </p>
        </div>

      
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100vh-140px)]">
          {rooms.length > 0 ? (
            rooms.map((swapId, index) => (
              <div
                key={swapId}
                onClick={() => navigate(`/user/chat/${swapId}`)}
                className="
                  bg-white border border-green-100 rounded-2xl p-4 cursor-pointer transition-all  duration-300 hover:bg-green-50 hover:border-green-400 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  
                  {/* Avatar */}
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>

                  {/* Chat Info */}
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Chat Room
                    </h3>
                    <p className="text-gray-500 text-xs truncate max-w-[220px]">
                      {swapId}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl">
                💬
              </div>

              <h2 className="text-xl font-bold text-green-700 mt-4">
                No Conversations
              </h2>

              <p className="text-gray-500 text-sm mt-2">
                Your chat rooms will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 ml-6 bg-white rounded-3xl shadow-xl border border-green-100 flex items-center justify-center">
        
        <div className="text-center">
          <div className="icon w-28 h-28 mx-auto rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-5xl">💬</span>
          </div>

          <h2 className="head text-3xl font-bold text-green-700 mt-6">
            Welcome to Messages
          </h2>

          <p className="para text-gray-500 mt-3">
            Select a conversation from the sidebar to start chatting
          </p>

          <button className="btn mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition duration-300">
            Explore Chats
          </button>
        </div>
      </div>

    </div>
  );
}