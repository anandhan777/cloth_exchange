const jwt=require("jsonwebtoken");

const protect=async(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1];
    if (!token){
        return res.status(404).json({message:"no token,token verification failed"});
        
    }
try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=({id:decoded.id});
    next();
}
catch(error){
    res.status(401).json({error:"token invalid"});
}
}

module.exports={protect};