const{UserProfile,ClothListing,User}=require("../models/Usermodel")
const{Feedback,Notification, Report}=require("../models/Adminmodel")
const{SwapCompleted}=require("../models/Swapmodel");

const getAllUsers=async(req,res)=>{
    try{
        const users=await UserProfile.find().populate("userId");
        if(users.length===0){
            res.status(404).json({message:"no user found"});

        }
        res.status(200).json(users);
    
    }catch(error){
        console.error("error fetching",error)
        res.status(500).json({error:"failed fetching users"})
    }

}

const visitUser=async(req,res)=>{
    const id=req.params.id;
    try{
        const user=await UserProfile.findById(id).populate("userId");
        if(!user){
            res.status(404).json({message:"user not found"});
        }
        res.status(200).json(user);

    }catch(error){
        console.error(error);
        res.status(500).json({error:"user profile not found"})
    }
}

const banUser=async(req,res)=>{
    const id=req.params.id;
    const{status}=req.body;
    try{
        const data=await User.findByIdAndUpdate(id,{status:status},{new:true});
        res.status(200).json({message:"banned user",data:data});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"suspention failed"})
    }
}
const Admin_viewListing=async(req,res)=>{
     try{
            const data=await ClothListing.find().populate("userId");
            if(!data){
                res.status(404).json({message:"cloth not found"});
            }
            res.status(200).json(data);
        }catch(error){
            console.error(error);
            res.status(500).json({messsage:"cloth ftching failed"});
        }
    }

const addFeedback=async(req,res)=>{
    const id=req.user.id;
    const{subject,category,priority,description}=req.body;
    try{
        const data=await Feedback.create({userId:id,subject,category,priority,description});
        res.status(201).json({message:"new feedback addded"})
        //  await Notification.create({title:"feedback",message:"your feedback has been sent",type:"NEW_FEEDBACK"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed sending feedback"});
    }
}
const viewFeedback=async(req,res)=>{
    try{
        const data=await Feedback.find({isRead:false}).populate("userId");
        if(!data){
            return res.status(404).json({message:"no feedback found"})
        }
        res.status(200).json(data)
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed fetching feedback"})
    }
}
const deleteFeedback=async(req,res)=>{
    const {id}=req.params;
    try{
        const data=await Feedback.findByIdAndDelete(id);
        res.status(200).json({message:"feedback deleted successfully"})
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed deleting feedback"})
    }
}

const totalCollection=async(req,res)=>{
    try{
        const totalusers=await User.find().countDocuments();
        const totallisting=await ClothListing.find().countDocuments();
        const totalexchange=await SwapCompleted.find().countDocuments();
        const totalreport=await Feedback.find().countDocuments();
        const treports=await Report.find().countDocuments();
        const exchangeissue=await Feedback.find({category:"ExchangeIssue"}).countDocuments();
        const userRequest=await Feedback.find({category:"UserRequest"}).countDocuments();
        const pendingreview=await Feedback.find({isRead:false}).countDocuments();
        res.status(200).json({totalusers,totallisting,totalexchange,totalreport,exchangeissue,userRequest,pendingreview,treports});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"error fetching data",error});
    }
}
const globalNotification=async(req,res)=>{
    try{
        const data=await Notification.find();
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed fetching message"});
    }
}
const deleteMessage=async(req,res)=>{
    const id=req.params.id;
    try{
        await Notification.findByIdAndDelete(id);
        res.status(200).json({messae:"deleted successfully"})
    }catch(error){
    console.error(error);
    res.status(500).json({message:"failed to delete"})
}
}
const readFeedback=async(req,res)=>{
    const id=req.params.id;
    try{
        await Feedback.findByIdAndUpdate(id,{isRead:true});
    }catch(error){
        console.log(error);
    }
}
const latestListing=async(req,res)=>{
    try {
        const data=await ClothListing.find().sort({createdAt:-1}).limit(2).populate("userId");
        const data1=await ClothListing.find().sort({originalPrice:-1}).limit(5).populate("userId");
        res.status(200).json({data,data1});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed fetching"});
        
    }
}
const viewReports=async(req,res)=>{
    try {
        const data=await Report.find({status:"pending"}).populate({path:"itemId",populate:{path:"userId",select:"name"}}).populate("userId");
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"dipslay report failed"})
        
    }
}
const deleteItem=async(req,res)=>{
    const id=req.params.id;
    try {
        await ClothListing.findByIdAndDelete(id);
        res.status(200).json({message:"deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed eleting item"});
        
    }
}
const deleteReport=async(req,res)=>{
    const id=req.params.id;
    const{status}=req.body;
    try {
        await Report.findByIdAndUpdate(id,{status:status},{new:true});
        res.status(200).json({message:"delete report success"})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed deleting report"})
        
    }
}
const reviewItem=async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    try {
       const data=await ClothListing.findById(id);
       res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed reviewing item"})
        
    }
}
const adminNotification=async(req,res)=>{
    try {
      const global=await Notification.find({userId:id,$or:[{type:"USER_REGISTRATION"},{type:"NEW_FEEDBACK"},{type:"CLOTH_LISTING"},{type:"NEW_CLOTH_LISTING"}]});
      const swap=await Notification.find({userId:id,$or:[{type:"SWAP_COMPLETED"}]});
      res.status(200).json({global,swap})
    } catch (error){
        console.error(eror);
        res.status(500).json({message:"failed fetching notification"})
        
    }
}
const SwapHistory=async(req,res)=>{
    try {
        const data=await SwapCompleted.find().populate("senderId receiverId").populate("itemoffered itemreceived");
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed fetching completed swaps"});
        
    }
}

const searchTypesOfUser=async(req,res)=>{
    const{typeuser}=req.query;
    console.log(req.query);
    try {
        const users=await User.find({status:{$regex:typeuser,$options:"i"}});
        const userIds=users.map(user=>user._id);
        const profiles=await UserProfile.find({userId:{$in:userIds}}).populate("userId");
        res.status(200).json(profiles);

        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed getting user"});
        
    }

}
const searchUser=async(req,res)=>{
    const {search}=req.query;
    try{
        const data=await UserProfile.find({$or:[{fullname:{$regex:search,$options:"i"}},
            {email:{$regex:search,$options:"i"}},
           ]}).populate("userId");
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"no getting user"});
    }
}

const reportCollection=async(req,res)=>{
    try {
        const total=await Report.find().countDocuments();
        const pending=await Report.find({status:"pending"}).countDocuments();
        const resolved=await Report.find({status:"Resolved"}).countDocuments();
        res.status(200).json({total,pending,resolved});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed fetching data"});      
    }
}



module.exports={reportCollection,searchUser,searchTypesOfUser,SwapHistory,adminNotification,reviewItem,deleteReport,deleteItem,viewReports,deleteMessage,latestListing,readFeedback,getAllUsers,visitUser,banUser,Admin_viewListing,addFeedback,viewFeedback,deleteFeedback,totalCollection,globalNotification}