const express=require("express");
const {userRegister,userProfileCreate,getUserProfile,removeRequest,addToWishList,showWishlist,deleteMyitems,userUpdateprofile,
    addListing,viewListing,myListing,swapRequest,incomingRequest,outgoingRequest,latestRequest,myLatestClothList,
addStarRating,reviewListing,ratingCalculate,searchItem,collection,sendReport,sendWarning,UserViewProfile,
AlatestRequest,AmyLatestClothList,userCompletedSwaps,UserNotification,deleteNotify}=require("../controllers/User_controller");
const router=express.Router();
const multer=require("multer");
const {protect}=require("../middleware/verifyToken");

const upload=multer({dest:"uploads/user"});

const storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,"uploads/user/"),
    filename:(req,file,cb)=>cb(null,Date.now()+"-"+file.originalname)
});
const userupload=multer({storage});

router.post("/register",userRegister);
router.post("/profilecreate",protect,userupload.fields([{name:"profilePicture",maxCount:1},{name:"profileBanner",maxCount:1}]),userProfileCreate);
router.put("/profileupdate",protect,userupload.fields([{name:"profilePicture",maxCount:1},{name:"profileBanner",maxCount:1}]),userUpdateprofile);
router.get("/getprofile",protect,getUserProfile)
router.post("/addlisting",protect,userupload.single("image"),addListing)
router.get("/viewlisting",protect,viewListing);
router.get("/mylisting",protect,myListing);
router.post("/sendswaprequest",swapRequest);
router.get("/incomingrequest",protect,incomingRequest);
router.get("/outgoingrequest",protect,outgoingRequest);
router.delete("/removerequest/:id",removeRequest);
router.post("/addtowishlist/:uid/:id",addToWishList);
router.get("/showwishlist",protect,showWishlist);
router.delete("/deletemyitem/:id",deleteMyitems);
router.get("/latestrequest",protect,latestRequest);
router.get("/latestclothlisting",protect,myLatestClothList);
router.post("/addstarrating",addStarRating);
router.get("/listuserreviews/:id",reviewListing);
router.get("/calculaterating/:id",ratingCalculate);
router.get("/search",searchItem);
router.get("/collection/:id",collection);
router.post("/sendreport/:id/:uid",sendReport);
router.post("/sendwarning/:id",sendWarning);
router.get("/userviewprofile/:id",UserViewProfile);
router.get("/alatestrequest/:id",AlatestRequest);
router.get("/alatestclothlisting/:id",AmyLatestClothList);
router.get("/usercompletedswaps/:id",userCompletedSwaps);
router.get("/usernotifications/:id",UserNotification);
router.delete("/deletenotify/:id",deleteNotify);





module.exports=router;