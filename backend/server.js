const express = require('express');
const cors = require('cors');
require("dotenv").config();
require("./config/db");
const http=require("http");
const {Server}=require("socket.io");
const {socketSetup}=require("./socket/socket");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes=require("./routes/adminRoutes")
const swapRoutes=require("./routes/swapRoutes")
const passport=require("passport");
const dns=require("dns");
require("./config/passport");


const authRoutes = require("./routes/authRoutes");
dns.setServers(['1.1.1.1'],['8.8.8.8']);
connectDB();
const app=express();
const server=http.createServer(app);
app.use(express.json());
app.use(passport.initialize());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://cloth-exchange-frontend.vercel.app",
    ],
    credentials: true,
  })
);
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/swap",swapRoutes);
app.use('/uploads', express.static('uploads'));


socketSetup(server);








app.get("/",(req,res)=>{
    res.send("helllo world");
});

PORT=process.env.PORT || 5000;
// app.listen(PORT,()=>{
//     console.log(`server is running on port ${PORT}`);
// })
server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})