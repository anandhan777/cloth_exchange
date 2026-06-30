const {SwapRequest,SwapTrack,SwapCompleted}=require("../models/Swapmodel");
const {Chat}=require("../models/Chatmodel");
const { UserProfile, ClothListing } = require("../models/Usermodel");
const {Notification}=require("../models/Adminmodel")

const acceptRequest=async(req,res)=>{
    const {id,sid,rid}=req.params;
    const {status,CStatus}=req.body;   
    try{
        const accept=await SwapRequest.findByIdAndUpdate(id,{status:"Accepted"},{new:true});
          await SwapTrack.findOneAndUpdate({swaprequestId:id},{status:status},{new:true});
          await ClothListing.updateMany({_id:{$in:[sid,rid]}},{$set:{status:CStatus}},{new:true});
          await Notification.create({title:"request accepted",message:"incoming request accepted",type:"REQUEST_ACCEPT"});
        res.status(200).json({message:"request accepted successfully",data:accept});
        res.status(200).json({message:"status updated"})
       
    }catch(error){
        console.error(error)
        res.status(500).json({message:"request accepting failed"})
        
        
    }

}

const rejectRequest=async(req,res)=>{
    const id=req.params.id;
    try{
        const reject=await SwapRequest.findByIdAndUpdate(id,{status:"Rejected"},{new:true});
        res.status(200).json({message:"request rejected"})
        await Notification.create({title:"request reject",message:"request rejected",type:"REQUEST_REJECT"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"request rejection failed",data:reject});
    }
}
const cancelRequest=async(req,res)=>{
    const id=req.params.id;
    try{
        const cancel=await SwapRequest.findByIdAndUpdate(id,{status:"Pending"},{new:true});
        res.status(200).json({message:"request cancelled",data:cancel});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"cancelation failed"});
    }
}

const sendMessage=async(req,res)=>{
    const {senderId,receiverId,swapId,message}=req.body;
    console.log(res.body);
    try{
        const msg=await Chat.create({senderId,receiverId,swapId,message});
        res.status(201).json(msg);
        await Notification.create({userId:receiverId,title:"start chatting",message:"you have a message from the receiver",type:"CHAT_STARTED"});

    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed to send message"})
    }
}

const getMessage=async(req,res)=>{
    const {swapId}=req.params;
    console.log(req.params);
    console.log(swapId);
    try{
        const msg=await Chat.find({swapId}).populate("receiverId").populate("senderId");
        //.populate({path:"senderId",populate:{path:"profile",model:"UserProfile"}}).populate({path:"receiverId",populate:{path:"profile",model:"UserProfile"}});
        if(!msg){
            return res.status(404).json({message:"chat not found"});
        }
        res.status(200).json(msg);  
    }catch(error){
       console.error(error);
       res.status(500).json({message:"failed to fetch message"});
    };
    
}

const chatRooms=async(req,res)=>{
    const {userId}=req.params;
    try{
        const rooms=await Chat.find({$or:[{senderId:userId},{receiverId:userId}]}).populate("swapId").populate({path:"receiverId",select:"name"}).sort({date:-1});
        const uniqueRoom=[...new Set(rooms.filter(r=>r.swapId).map(r=>r.swapId._id))];
        res.status(200).json(uniqueRoom);
        console.log(uniqueRoom);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed fetching chatroom"})
    }
}

const swapTracking=async(req,res)=>{
    const{userId,itemId}=req.params;
    console.log(userId);
    try{
        const trackStatus=await SwapTrack.find({$and:[{$or:[{senderId:userId},{receiverId:userId}]},{$or:[{itemoffered:itemId},{itemreceived:itemId}]}]})
        .populate("senderId").populate("receiverId").populate("itemoffered").populate("itemreceived");
        res.status(200).json(trackStatus);
    }catch(error){
        console.error(error);
        res.status(500).json("failed fetching status");
    }
}
const startChat=async(req,res)=>{
    const id=req.params.id;
    const {status}=req.body;
    try{
        await SwapTrack.findOneAndUpdate({swaprequestId:id},{status:status},{new:true});
        res.status(200).json({message:"status updated successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:'updating status failed'});
    }
}
const getReceiverProfile=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await UserProfile.findOne({userId:id}).populate("userId");
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed fetching profile"})
    }
}
const swapCompleted=async(req,res)=>{
    const id=req.params.id;
    const {status,sender,receiver,CStatus}=req.body;
    console.log(req.body);
    try{
        const data=await SwapTrack.findOne({$and:[{$or:[{senderId:id},{receiverId:id}]},{$or:[{senderId:receiver},{receiverId:receiver}]}]});
        data.status=status;
        await data.save();
         await ClothListing.updateMany({userId:{$in:[sender,receiver]}},{$set:{status:CStatus}},{new:true});
        await SwapCompleted.create({senderId:data.senderId,receiverId:data.receiverId,
            itemoffered:data.itemoffered,itemreceived:data.itemreceived,status:data.status
        });
       await Notification.create({title:"exchange completted",message:"new exchange completed",type:"SWAP_COMPLETED"})
        res.status(200).json({message:"swap completed"})
    }catch(error){
        console.error(error);
        res.status(500).json({message:'swap completetion failed'})
    }
}

const fetchStatus=async(req,res)=>{
   const{id,sid,rid}=req.params;
   try{
    const status=await SwapTrack.findOne({swaprequestId:id},{$and:[{$or:[{senderId:sid},{receiverId:sid}]},{$or:[{senderId:rid},{receiverId:rid}]}]})
    console.log(status)
    res.status(200).json(status);
   }catch(error){
    console.error(error);
    res.status(500).json({message:"failed getting status"});
   }

}

const swapChartAnalysis=async (req, res) => {
  try {
    const stats = await SwapRequest.aggregate([
      { $match: { status: "Completed" } }, // only completed swaps
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format for chart.js or recharts
    const formatted = stats.map(s => ({
      label: `${s._id.month}-${s._id.year}`,
      value: s.count
    }));

    res.json(formatted);
    console.log(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}


module.exports={swapChartAnalysis,fetchStatus,acceptRequest,rejectRequest,cancelRequest,sendMessage,getMessage,chatRooms,swapTracking,startChat,getReceiverProfile,swapCompleted}