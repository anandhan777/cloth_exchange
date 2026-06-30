const mongoose=require("mongoose");

const connectDB=async()=>{
   
    try{
        const con=await mongoose.connect(process.env.MONGO_URI);
    
        console.log(`MongoDB connected: ${con.connection.host}`);
    }catch(error){
        console.error("Error connecting to database",error);
        
        process.exit(1);
    }
}

module.exports=connectDB;
