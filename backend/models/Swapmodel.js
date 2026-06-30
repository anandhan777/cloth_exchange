const mongoose=require("mongoose");
const {User,UserProfile,ClothListing}=require("./Usermodel")



const swapRequestSchema = new mongoose.Schema(
  {
    senderId: {type: mongoose.Schema.Types.ObjectId,ref:"User",required: true,},

    receiverId: { type: mongoose.Schema.Types.ObjectId,ref:"User",required: true,},

    senderListingId: {type: mongoose.Schema.Types.ObjectId,ref:"ClothListing",required: true,},

    receiverListingId: {type: mongoose.Schema.Types.ObjectId,ref:"ClothListing",required: true,},

    status: {type: String,
      enum: [
        "Pending",
        "Accepted",
        "Rejected",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const swapTrackSchema=new mongoose.Schema({
  swaprequestId:{type:mongoose.Schema.Types.ObjectId,ref:"SwapRequest",required:true},
  senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  itemoffered:{type:mongoose.Schema.Types.ObjectId,ref:"ClothListing",required:true},
  itemreceived:{type:mongoose.Schema.Types.ObjectId,ref:"ClothListing",required:true},
  status:{type:String,enum:["requested","accepted","chatting","completed","rejected"],default:"requested"},
},{timestamps:true});

const SwapTrack=mongoose.model("SwapTrack",swapTrackSchema);

const SwapRequest=mongoose.model("SwapRequest",swapRequestSchema)

const swapCompletedSchema=new mongoose.Schema({
  senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
  itemoffered:{type:mongoose.Schema.Types.ObjectId,ref:"ClothListing",required:true},
  itemreceived:{type:mongoose.Schema.Types.ObjectId,ref:"ClothListing",required:true},
  status:{type:String,default:"completed"},
},{timestamps:true});

const SwapCompleted=mongoose.model("SwapCompleted",swapCompletedSchema);

module.exports = {SwapRequest,SwapTrack,SwapCompleted}
 
    