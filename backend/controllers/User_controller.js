const {User,UserProfile,ClothListing,StarRating}=require("../models/Usermodel");
const {Notification,Report}=require("../models/Adminmodel");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const {generateToken}=require("../utils/generatetoken");
const{SwapRequest,SwapTrack, SwapCompleted}=require("../models/Swapmodel")


const userRegister=async(req,res)=>{
    const{name,email,password}=req.body;
    console.log(req.body);
    try{
        
        const userexist=await User.findOne({email});
        if(userexist){
            return res.status(400).json({message:"user already exist"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashedPassword});
        const token=generateToken(user._id);
        await Notification.create({title:"New user",message:"new user registered",type:"USER_REGISTRATION"});
        res.status(201).json({message:"user register successfully",user,token});
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:"user registration failed"})
    }

}

const userProfileCreate=async(req,res)=>{
    const{fullname,email,phone,location,bio,preferredSize,favoriteCategory}=req.body;
    const id=req.user.id;
    try{
        await User.findByIdAndUpdate(id,{isProfile:true});
        const exist=await UserProfile.findOne({userId:id});
        if(exist){
            return res.status(401).json({message:"profile already exists"});

        }
        const newProfile= await UserProfile.create({
            userId:id,
            fullname,
            email,
            phone,
            location,
            profilePicture:req.files["profilePicture"]?
            `/uploads/user/${req.files["profilePicture"][0].filename}`:null,
            profileBanner:req.files["profileBanner"]?
            `/uploads/user/${req.files["profileBanner"][0].filename}`:null,
            bio,
            preferredSize,
            favoriteCategory,
        });
        await Notification.create({userId:id,title:"profile created",message:"profile created successfully",type:"PROFILE_CREATE"});
        res.status(201).json({message:"profile created successfully",profile:newProfile});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed to create profile"});
    }
}

const getUserProfile=async(req,res)=>{
    const id=req.user.id;
    try{
        const profile=await UserProfile.findOne({userId:id}).populate("userId","name email");
        if(!profile){
            return res.status(404).json({message:"profile not found"});
        }
        res.status(201).json(profile);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"failed to fetch profile"})
    }
    }

    const userUpdateprofile=async(req,res)=>{
         const{fullname,email,phone,location,bio,preferredSize,favoriteCategory}=req.body;
         const id=req.user.id;
         try{
            const data=await UserProfile.findOneAndUpdate({userId:id},{fullname,email,phone,location,bio,preferredSize,
                favoriteCategory,
                  profilePicture:req.files["profilePicture"]?
            `/uploads/user/${req.files["profilePicture"][0].filename}`:null,
            profileBanner:req.files["profileBanner"]?
            `/uploads/user/${req.files["profileBanner"][0].filename}`:null,})
            res.status(200).json({message:"profile updated successfully"});
            await Notification.create({userId:id,title:"profile updated",message:"profile updated successfully",type:"PROFILE_UPDATE"});
         }catch(error){
            console.error(error);
            res.status(500).json({mesage:"error updating profile"});
         }

    }
  
    const addListing=async(req,res)=>{
        const {title,category,brand,condition,originalPrice,yearsUsed,timesWorn,size,color,material,
            gender,interestedCategories,preferredSizes,city,state}=req.body;
        const id=req.user.id;
        console.log(req.user.id);
        const image=req.file?`/uploads/user/${req.file.filename}`:null;

        const conditionMultiplier = {
      "New With Tags": 1,
      "Like New": 0.9,
      Excellent: 0.8,
      Good: 0.7,
      Fair: 0.5,
      Poor: 0.3,
    };

    const estimatedValue =
      originalPrice *
      conditionMultiplier[condition] *
      (1 - yearsUsed * 0.05);
        try{
            const listing=await ClothListing.create({userId:id,title,category,brand,condition,originalPrice,
                yearsUsed,timesWorn,size,color,material,gender,image,interestedCategories,preferredSizes,city,state,estimatedValue,
            }).populate(userId);
             await Notification.create({userId:id,title:"your item",message:"your cloth item listed successfully",type:"NEW_CLOTH_LISTING",isGlobal:true});
             await Notification.create({title:"new item",message:"new cloth item found",type:"NEW_CLOTH_LISTING",isGlobal:true});
            res.status(201).json({message:"list cloth successfully",listing});
           
        }catch(error){
            console.error(error);
            res.status(500).json({message:"failed upload listing"});
        }

    }

    const viewListing=async(req,res)=>{
         const id=req.user.id;
        try{
            const data=await ClothListing.find({userId:{$ne:id},status:"Available"}).populate("userId");
            if(!data){
                res.status(404).json({message:"cloth not found"});
            }
            res.status(200).json(data);
        }catch(error){
            console.error(error);
            res.status(500).json({messsage:"cloth ftching failed"});
        }
    }
    const myListing=async(req,res)=>{
        const id=req.user.id;
        try{
            const data=await ClothListing.find({userId:id,status:"Available"});
            if(!data){
                res.status(404).json({message:"no cloths found"});

            }
            res.status(200).json(data);

        }catch(error){
            console.error(error);
            res.status(500).json({error:"data fetching failed"});
        }
    }

const deleteMyitems=async(req,res)=>{
    const {id}=req.params;
    console.log(id)
    try{
        const newlist=await ClothListing.findByIdAndDelete(id);
        await Notification.create({title:"item deleted",message:"your item has been deleted",type:"CLOTH_LISTING"});
        res.status(200).json(newlist);
    }catch(error){
       console.error(error);
       res.tatus(500).json({message:"failed deleting items"});
    }
    
}

const swapRequest=async(req,res)=>{
    const{senderId,receiverId,senderListingId,receiverListingId}=req.body;
    
    try{
        const data=await SwapRequest.create({senderId,receiverId,senderListingId,receiverListingId});
        
        const track=await SwapTrack.create({swaprequestId:data._id,senderId,receiverId,itemoffered:senderListingId,itemreceived:receiverListingId});
        res.status(201).json({message:"request send successfully",data});
        res.status(201).json({message:"track started successfully",track});
        await Notification.create({userId:senderId,title:"request send",message:"your swap request send successfully",type:"REQUEST_SEND"});

    }catch(error){
        console.error(error);
        res.status(500).json({error:"swap request failed"});
    }
}
const incomingRequest=async(req,res)=>{
    const id=req.user.id;
    try{
         
        const incoming=await SwapRequest.find({receiverId:id}).populate("senderId").populate("receiverId").populate("senderListingId").populate("receiverListingId");
        if(!incoming){
            res.status(404).json({message:"no request found"});
        }
        res.status(200).json(incoming);   
        await Notification.create({userId:id,title:"new swap request",message:"you have a new request to swap item",type:"SWAP_REQUEST"});     
    }catch(error){
        console.error(error);
        res.status(500).json({error:"incoming request fetching failed"})
    }
}
const outgoingRequest=async(req,res)=>{
    const id=req.user.id;
    
    try{
        
        const incoming=await SwapRequest.find({senderId:id}).populate("senderId").populate("receiverId").populate("senderListingId").populate("receiverListingId");
        if(!incoming){
            res.status(404).json({message:"no request found"});
        }
        res.status(200).json(incoming);        
    }catch(error){
        console.error(error);
        res.status(500).json({error:"outgoing-request fetching failed"});
    }
}

const removeRequest=async(req,res)=>{
    const id=req.params.id;
    try{
        const newdata=await SwapRequest.findByIdAndDelete(id);
        res.status(200).json(newdata);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"request deleted failed"});
    }
}

const addToWishList=async(req,res)=>{
    const {uid,id}=req.params;
    try{
        const userpro=await UserProfile.findOne({userId:uid});
        if(!userpro){
            return res.status(404).json({message:"user not found"});
        }
        const item=await ClothListing.findById(id);
        if(!item){
            return res.status(404).json({message:"item not found"})
        }
        if(userpro.wishlist.some(w => w.toString() === id)){
           return res.status(400).json({message:"item already exist"});
        }
        userpro.wishlist.push(new mongoose.Types.ObjectId(id));
        await userpro.save();
        res.status(201).json({message:"item added to wishlist"})
    }catch(error){
        console.error(error);
        res.status(500).json({message:"added to wishlist failed"});
    }
}

const showWishlist=async(req,res)=>{
    const id=req.user.id;
    try{
        const wish=await UserProfile.findOne({userId:id}).populate("wishlist");
        res.status(200).json(wish.wishlist);
    }catch(error){
        console.error(error);
        res.ststus(500).json({message:"fetching wishlist failed"})
    }

}

const latestRequest=async(req,res)=>{
    const id=req.user.id;
    try{
        const data=await SwapRequest.find({senderId:id}).sort({createdAt:-1}).limit(3).populate("senderListingId").populate("receiverListingId");
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed to fetch"})
    }
}
const AlatestRequest=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await SwapRequest.find({senderId:id}).sort({createdAt:-1}).limit(3).populate("senderListingId").populate("receiverListingId");
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed to fetch"})
    }
}

const myLatestClothList=async(req,res)=>{
    const id=req.user.id;
    try{
        const data=await ClothListing.find({userId:id}).sort({createdAt:-1}).limit(4);
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed to fetch"});
    }

}
const AmyLatestClothList=async(req,res)=>{
    const id=req.params.id;
    try{
        const data=await ClothListing.find({userId:id}).sort({createdAt:-1}).limit(4);
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"failed to fetch"});
    }

}
const addStarRating=async(req,res)=>{
  const {receiverId,senderId,rating,review,feedback}=req.body;
  try{
    const data=await StarRating.create({senderId,receiverId,rating,review,feedback});
    res.status(201).json({message:"response saved succesfully"})
  }catch(error){
    console.error(error);
    res.status(500).json({message:"failed saving response"})
  }
}
const reviewListing=async(req,res)=>{
  const id=req.params.id;
  try{
    const data=await StarRating.find({receiverId:id}).populate("senderId");
    res.status(200).json(data);
  }catch(error){
    console.error(error);
    res.status(500).json({message:"failed fetching reviews"});
  }
}

const ratingCalculate=async(req,res)=>{
  const id=req.params.id;
  try{
    const data=await StarRating.find({receiverId:id});
    const totalrating=data.reduce((sum,item)=>sum +parseInt(item.rating),0);
    const totalreviews=data.length;
    const average=totalreviews>0?(totalrating/totalreviews).toFixed(1):0;
    const dat1=await StarRating.find({receiverId:id}).sort({createdAt:-1}).limit(2).populate("senderId");
    res.status(200).json({totalrating,totalreviews,average,dat1});
 

  }catch(error){
    console.error(error);
    res.status(500).json({message:"failed fetching rate calculation"})
  }
}
const searchItem=async(req,res)=>{
    const {search}=req.query;
    try{
        const data=await ClothListing.find({$or:[{category:{$regex:search,$options:"i"}},
                                              {size:{$regex:search,$options:"i"}},
                                              {city:{$regex:search,$options:"i"}}
        ]});
        res.status(200).json(data);
    }catch(error){
        console.error(error);
        res.status(500).json({message:"error fetching",error});
    }
}

const collection=async(req,res)=>{
    const id=req.params.id;
    try {
        const list=await ClothListing.find({userId:id}).countDocuments();
        const exchange=await SwapCompleted.find({receiverId:id}).countDocuments();
        const wishlist=await UserProfile.findOne({userId:id}).sort({createdAt:-1}).limit(4).populate("wishlist");
        res.status(200).json({list,exchange,wishlist});
    } catch (error) {
        console.error(error);
        res.status(500).json({mesage:"failed fetching"})
        
    }
}
const sendReport=async(req,res)=>{
    const{reason}=req.body;
    const{id,uid}=req.params;
    console.log(res.body,id,uid);
    try {
        const data=await Report.create({userId:uid,itemId:id,reason});
        res.status(201).json({message:"report created successfully"});
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"failed to create report"});
    }
}

const sendWarning=async(req,res)=>{
    const id=req.params.id;
    const {reason}=req.body;
    try {
        const data=await Notification.create({userId:id,title:"warning",message:reason,type:"WARNING"});
        res.status(201).json({message:"send successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed send warning"});
        
    }
}
const UserViewProfile=async(req,res)=>{
    const id=req.params.id;
    try {
        const data=await UserProfile.findOne({userId:id});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:"failed fetching"})
        
    }
}
const userCompletedSwaps=async(req,res)=>{
    const id=req.params.id;
    try {
        const data=await SwapCompleted.find({$or:[{senderId:id},{receiverId:id}]}).populate("senderId receiverId").populate("itemoffered itemreceived");
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed fetching completed swaps"});
        
    }
}
const UserNotification=async(req,res)=>{
    const id=req.params.id;
    try {
        const global=await Notification.find({userId:id,$or:[{type:"PROFILE_CREATE"},{type:"PROFILE_UPDATE"},{type:"PASSWORD_CHANGE"},{type:"NEW_FEEDBACK"},{type:"CLOTH_LISTING"},{type:"NEW_CLOTH_LISTING"}]});
        const swap=await Notification.find({userId:id,$or:[{type:"SWAP_REQUEST"},{type:"REQUEST_ACCEPT"},{type:"REQUEST_REJECT"},{type:"REQUEST_SEND"},{type:"SWAP_COMPLETED"}]});
        const warning=await Notification.find({userId:id,$or:[{type:"WARNING"}]});
        res.status(200).json({global,swap,warning});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"failed fetching"});
        
    }

}
const deleteNotify=async(req,res)=>{
    const id=req.params.id;
    try {
        const data=await Notification.findByIdAndDelete(id);
        res.status(200).json({message:"message deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({mssage:"failed deleting notification"});
        
    }
}






module.exports={deleteNotify,userRegister,userProfileCreate,getUserProfile,addToWishList,showWishlist,deleteMyitems,userUpdateprofile,
    addListing,viewListing,myListing,swapRequest,incomingRequest,outgoingRequest,removeRequest,sendReport,sendWarning,userCompletedSwaps,UserNotification,
  latestRequest,myLatestClothList,addStarRating,reviewListing,ratingCalculate,searchItem,collection,UserViewProfile,AlatestRequest,AmyLatestClothList};