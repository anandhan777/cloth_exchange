const {acceptRequest,rejectRequest,cancelRequest,sendMessage,getMessage,chatRooms,
    swapTracking,startChat,getReceiverProfile,swapCompleted,fetchStatus,swapChartAnalysis}=require("../controllers/swap_controller");
const express=require("express");
const router=express.Router();

router.put("/acceptrequest/:id/:sid/:rid",acceptRequest);
router.put("/rejectrequest/:id",rejectRequest);
router.put("/cancelrequest/:id",cancelRequest);
router.post("/sendmessage",sendMessage);
router.get("/getmessage/:swapId",getMessage);
router.get("/chatrooms/:userId",chatRooms);
router.get("/swaptracking/:userId/:itemId",swapTracking);
router.put("/startchat/:id",startChat);
router.get("/getreceiverprofile/:id",getReceiverProfile);
router.put("/swapcompleted/:id",swapCompleted);
router.get("/getstatus/:id/:sid/:rid",fetchStatus);
router.get("/swap-stats",swapChartAnalysis);

module.exports=router;