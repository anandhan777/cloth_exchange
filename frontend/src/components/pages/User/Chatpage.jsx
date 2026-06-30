
import { Send } from "lucide-react";
import{useState,useEffect} from "react";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import socket from "../../../../socket/Socket"
import axios from "axios";
import { Check } from "lucide-react";

export default function ChatPage() {
  const location=useLocation();
  const [message, setMessage] = useState([]);
  const[profile,setProfile]=useState(null);
  const [status,setStatus]=useState(null);
  const navigate=useNavigate();

  const [text,setText]=useState("");
  const {swapId}=useParams();
  const receiver_Id=location.state;
  const USER=JSON.parse(localStorage.getItem("user"));
  

const user=JSON.parse(localStorage.getItem("user"));
const swapComplete=async(senderId,receiverId)=>{
  try{
  await axios.put(`http://localhost:5000/api/swap/swapcompleted/${USER._id}`,{sender:senderId,receiver:receiverId,status:"completed",CStatus:"Swapped"});
  console.log("swap completed")
  }catch(error){
    console.log(error);
  }
  navigate("/user/userstarrating",{state:{senderId:senderId,receiverId:receiverId}});
}
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    socket.connect();
    socket.emit("setup",user._id);
    socket.emit("join_swap",swapId);

    // axios.get(`http://localhost:5000/api/getmessage/${swapId}`)
    // .then(res=>setMessage(res.data))
   
  const fetchChat=async()=>{
    const res=await axios.get(`http://localhost:5000/api/swap/getmessage/${swapId}`);
    console.log(res.data);
    setMessage(res.data); 
  }
  fetchChat();
 
 
    
    
    socket.on("receive_message",(msg)=>{
      setMessage(prev=>[...prev,msg]);
    });

    return ()=>{
      socket.off("receive_message");
      socket.disconnect();

    }
  },[swapId,user._id]);
  

  const sendMessage=()=>{
    if(!text.trim()) return;
    socket.emit("send_message",{
      senderId:user._id,
      receiverId:receiver_Id,
      swapId,text
    });
    setText("");
  }

   const currentuser=message[0]?.senderId;
   const otheruser=message[0]?.receiverId;
   const receiver=currentuser?._id===USER._id?otheruser?._id:currentuser?._id;
   useEffect(()=>{
    if(!receiver)return;

    
    const fetchProfile=async()=>{
       try{
         const data=await axios.get(`http://localhost:5000/api/swap/getreceiverprofile/${receiver}`);
    
         setProfile(data.data);
       }catch(error){
         console.log(error);
       }
    }
     fetchProfile();  
    const fetchStatus=async()=>{
       try{
         const stat=await axios.get(`http://localhost:5000/api/swap/getstatus/${swapId}/${USER._id}/${receiver}`);
         setStatus(stat.data);
         console.log(stat.data)
         
       }catch(error){
         
       }
    }
     fetchStatus();  
   },[receiver]);

   

  
   

  return (
    <div className="h-[680px] bg-gray-100 flex pb-1">

      {/* Sidebar */}

      <div className="w-80 bg-white border-r hidden md:flex flex-col border-none">

        <div className="p-5 border-b">
          <h2 className="text-2xl font-bold">
            Chats
          </h2>
        </div>

        <div className="overflow-y-auto flex-1">

          <div className="p-4 border-b cursor-pointer bg-green-50 hover:bg-green-100">

            <div className="flex items-center gap-3">

              <img
                src={`http://localhost:5000${profile?.profilePicture}`}
                alt=""
                className="w-12 h-12 rounded-full"
              />

              <div>
                <h3 className="font-semibold">
                 
                </h3>

                <p className="text-sm text-gray-500">
                  Let's swap tomorrow
                </p>
              </div>

            </div>

          </div>

            

            

          

        </div>

      </div>

      {/* Chat Section */}

      <div className="flex-1 flex flex-col">

        {/* Header */}
  
        <div className="bg-white border-b p-4 flex justify-between">

          <div className="flex items-center gap-3">
           
            <img
               src={`http://localhost:5000${profile?.profilePicture}`}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-lg">
              {currentuser?._id===USER._id?otheruser?.name:currentuser?.name}
              </h2>

              <p className="text-sm text-green-600">
                Online
              </p>
            </div>
     
           
          

          </div>
        {status?.status==="completed"? (<div className=" flex gap-2 items-center border-2 text-center py-2 rounded-full border-green-600 text-green-700 bg-white px-3"><div className="bg-green-500 p-2 rounded-full"><Check/></div>swap completed</div>):
       (<button onClick={()=>swapComplete(currentuser?._id,otheruser?._id)} className="bg-gradient-to-r from-green-700 to-teal-400 px-4 rounded-full text-white mr-5">complete swap</button>)}
        </div>
            


        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {message.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                 msg.senderId?._id!==USER._id ?
                   "justify-end":
                    "justify-start"
                }`}
               
            >

              <div
                className={`max-w-md px-4 py-3 rounded-2xl ${
                  msg.senderId?._id!==USER._id ?
                    "bg-teal-600 text-white":
                   "bg-white shadow"
                }`}
              >

                <p>{msg.message}</p>

                <span
                  className={`text-xs mt-2 block ${
                     msg.senderId?._id!==USER._id ?
                      "text-white"
                      : "text-gray-400"
                  }`}
                >
                  {msg.date}
                </span>

              </div>

            </div>
          ))}

        </div>

        {/* Input */}

        <div className="bg-white border-t p-4">

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Type a message..."
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              className="
                flex-1
                border
                rounded-full
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-green-600
                focus:outline-none
              "
            />

            <button onClick={sendMessage}
              className="
                bg-green-700
                text-white
                px-5
                rounded-xl
                hover:bg-green-800
              "
            >
              <Send size={20} className="ransform hover:rotate-360 duration-400"/>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}