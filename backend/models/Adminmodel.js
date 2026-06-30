const mongoose=require("mongoose");
const{ClothListing,User}=require("../models/Usermodel");

const feedbackSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User",},
    subject: {type:String},
    category: {type: String,enum: ["Bug","Feature","UserRequest","ExchangeIssue","General",],},
    priority: {type: String,enum: ["Low","Medium","High"],},
    description:{type:String},
    isRead:{type:Boolean,default:false},
    status: {type: String,enum: ["Pending","In Progress","Resolved","Rejected",],default: "Pending",},
  },
  {timestamps: true,}
);
const Feedback=mongoose.model("Feedback",feedbackSchema);
const notificationSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    title: {type: String,required: true,},
    message: {type: String,required: true,},
    type: {type: String,enum: [
        "PROFILE_CREATE",
        "PROFILE_UPDATE",
        "USER_REGISTRATION",
        "PASSWORD_CHANGE",
        "NEW_FEEDBACK",
        "CLOTH_LISTING",
        "CHAT_STARTED",
        "SWAP_COMPLETED",
        "NEW_CLOTH_LISTING",
        "SWAP_REQUEST",
        "REQUEST_SEND",
        "REQUEST_ACCEPT",
        "REQUEST_REJECT",
        "WARNING"
      ],
      required: true,
    },
    isRead: {type: Boolean,default: false,},
    isGlobal:{type:Boolean,deafult:false},
    relatedId: {type: mongoose.Schema.Types.ObjectId,default: null, },
    redirectUrl: {type: String,default: "",},
  },{timestamps: true,}
);

const Notification=mongoose.model("Notification",notificationSchema);

const ReportSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  itemId:{type:mongoose.Schema.Types.ObjectId,ref:"ClothListing",required:true},
  reason:{type:String},
  status:{type:String,enum:["pending","resolved"],default:"pending"}
},{timestamps:true})

const Report=mongoose.model("Report",ReportSchema);

module.exports={Feedback,Notification,Report}