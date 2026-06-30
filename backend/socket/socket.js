const {Chat}=require("../models/Chatmodel");
const {Server}=require("socket.io");

const onlineUsers={};

const socketSetup=(server)=>{
    const io=new Server(server,{
        cors:{origin:"https://cloth-exchange-frontend.vercel.app",
            methods:["GET","POST"],
            credentials:true,
        }
    });
    io.on("connection",(socket)=>{
        console.log("user connected",socket.id);
        
        //register user
        socket.on("setup",({userId})=>{
            onlineUsers[userId]=socket.id;
            console.log("online users:",onlineUsers);
        });

        //join private swap room
        socket.on("join_swap",(swapId)=>{
            socket.join(swapId);
            console.log(`users ${socket.id} join swap room ${swapId}`);    
        });
        //handle sending message
        socket.on("send_message",async(data)=>{
            const {senderId,receiverId,swapId,text}=data;
            try{
                const newMessage=await Chat.create({
                    senderId,receiverId,swapId,message:text,});
                //emit to everyon in the swap room
                io.to(swapId).emit("receive_message",newMessage);
            }catch(error){
              console.error("error saving message:",error);
            }
        });
        socket.on("disconnect",()=>{
        console.log("user disconnect",socket.id);
        for(const userId in onlineUsers){
            if (onlineUsers[userId]===socket.id){
                delete onlineUsers[userId];
                break;
            }
        }
        console.log("online users",onlineUsers)
    });
    });

};

module.exports={socketSetup};