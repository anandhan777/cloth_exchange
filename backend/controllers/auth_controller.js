const {generateToken} = require("../utils/generateToken");
const {User}=require("../models/Usermodel");
const bcrypt=require("bcryptjs");

const userLogin=async(req,res)=>{
    const {name,password}=req.body;
    try{
        if(name===process.env.ADMIN_USERNAME && password===process.env.ADMIN_PASSWORD){
            return res.status(201).json({message:"admin login successfully",role:"admin"});

    }
    const user=await User.findOne({name});
    if(!user){
        return res.status(404).json({message:"user not found"});    
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"incalid credentials"});
    }
    if(user.status==="suspended"){
        return res.status(400).json({message:"incalid credentials"});
    }
    res.status(201).json({message:"user login successfully",user,token:generateToken(user._id)});
}
catch(error){
    console.error(error);
    res.status(500).json({message:"user login failed"});
}   
}

module.exports={userLogin};