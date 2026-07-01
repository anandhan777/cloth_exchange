import {io} from "socket.io-client";

const socket=io("https://cloth-exchange-backend.onrender.com");
export default socket;