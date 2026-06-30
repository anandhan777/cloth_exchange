const mongoose=require("mongoose");
const {User}=require("../models/Usermodel");
const {SwapRequest}=require("../models/Swapmodel");

const ChatSchema=new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    swapId:{type:mongoose.Schema.Types.ObjectId,ref:"SwapRequest",required:true},
    message:{type:String,required:true},
    date:{type:Date,default:Date.now()}
      
});

const Chat=mongoose.model("Chat",ChatSchema);

module.exports={Chat};