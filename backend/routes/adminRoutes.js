const express=require("express");
const {getAllUsers,visitUser,banUser,Admin_viewListing,addFeedback,viewFeedback,deleteFeedback,totalCollection,
    globalNotification,readFeedback,latestListing,deleteMessage,viewReports,deleteItem,deleteReport,reviewItem,adminNotification,SwapHistory,
    searchTypesOfUser,searchUser,reportCollection,
}=require("../controllers/admin_controller");
const {protect}=require("../middleware/verifyToken");

const router=express.Router();

router.get("/viewusers",getAllUsers);
router.get("/viewprofile/:id",visitUser);
router.put("/banuser/:id",banUser);
router.get("/viewlisting",Admin_viewListing);
router.post("/addfeedback",protect,addFeedback);
router.get("/viewfeedback",viewFeedback);
router.delete("/deletefeedback/:id",deleteFeedback);
router.get("/totalcollections",totalCollection);
router.get("/globalnotification",globalNotification);
router.put("/readfeedback/:id",readFeedback);
router.get("/latestlisting",latestListing);
router.delete("/deletemessage/:id",deleteMessage);
router.get("/viewreports",viewReports);
router.delete("/deleteitem/:id",deleteItem);
router.put("/deletereport/:id",deleteReport);
router.get("/reviewitem/:id",reviewItem);
router.get("/adminnotification/:id",adminNotification);
router.get("/swaphistory",SwapHistory);
router.get("/searchtypes",searchTypesOfUser);
router.get("/searchuser",searchUser);
router.get("/reportcollection",reportCollection);

module.exports=router;