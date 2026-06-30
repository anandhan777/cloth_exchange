const express = require('express');
const passport=require("passport");
const jwt=require("jsonwebtoken");
const{userLogin}=require("../controllers/auth_controller");
const router=express.Router();

router.post("/login",userLogin);
router.get("/google",passport.authenticate("google",{
    scope:["profile","email"],
    session:false,
}));
router.get("/google/callback",passport.authenticate("google",{
    session:false,
    failureRedirect:"/login",
}),
async(req,res)=>{
    const token=jwt.sign({id:req.user.id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.redirect(`http://localhost:5173/google-success?token=${token}`)
});

module.exports=router;