import { Eye, Pencil, Trash2 } from "lucide-react";
import axios from "axios"
import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import { FaSearch,FaBan, FaUnlock} from "react-icons/fa";




export default function UserTable() {
    const navigate=useNavigate();
    const[typeuser,setTypeuser]=useState("");
    const[search,setSearch]=useState("");
   const[users,setUsers]=useState([]);
    useEffect(()=>{
        const fetchUsers=async()=>{
           try{
            const res=await axios.get("https://cloth-exchange-backend.onrender.com/api/admin/viewusers");
            setUsers(res.data);
            console.log(res.data)
           }catch(error){
            console.log(error);
           }
        }
        fetchUsers();
    },[])
    const viewProfile=(id)=>{
        navigate(`/admin/viewusers/viewprofile/${id}`);
    }
const searchUser=async()=>{
      if (search.trim() !== "") {       
        const res=await axios.get(`https://cloth-exchange-backend.onrender.com/api/admin/searchuser?search=${search}`)
          .then((res) => setUsers(res.data))
          .catch((err) => console.error(err));  
      } else {
        setUsers([]);
      }
    }
   
   
   
    const handleClick=async()=>{
      try {
        const res=await axios.get(`https://cloth-exchange-backend.onrender.com/api/admin/searchtypes?typeuser=${typeuser}`);
        setUsers(res.data);
        console.log(res.data);
      } catch(error) {
        console.log(error);
        
      }
    }
     const banUser=async(id)=>{
    try{
      console.log(id);
       alert("are you sure you want to suspend this user");
      const res=await axios.put(`https://cloth-exchange-backend.onrender.com/api/admin/banuser/${id}`,{status:"suspended"});
      const updateswap=res.data.data;
        setUsers((prev)=>prev.map((req)=>req.userId===id? {...req,status:updateswap.status}:req));    
    }catch(error) {
      console.log(error);
    }
}
     const unBlock=async(id)=>{
    try{
      console.log(id);
       alert("block released");
      const res=await axios.put(`https://cloth-exchange-backend.onrender.com/api/admin/banuser/${id}`,{status:"active"});
      const updateswap=res.data.data;
        setUsers((prev)=>prev.map((req)=>req.userId===id? {...req,status:updateswap.status}:req));
      
       
    }catch(error) {
      console.log(error);
      
    }
}
  return (
    <div className="bg-[#faf9f5]  rounded-2xl shadow-sm border border-gray-100 py-20 px-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            User Management
          </h2>
          <p className="text-gray-500 text-xl mt-1">
            Manage all registered users
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex gap-3">
          <div className="flex gap-[10px]">
          <FaSearch className="absolute m-3 text-gray-600"/>
          <input
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="    Search users..."
            className="relative w-80 border rounded-xl px-4 py-2 pl-10 ring-2 focus:outline-none focus:ring-2 ring-gray-400 focus:ring-green-600"
          />
          <button onClick={searchUser} className="bg-green-700 text-white p-2 px-[13px] rounded-full"><FaSearch/></button></div>

          <select value={typeuser} onChange={(e)=>setTypeuser(e.target.value)}  className="border ring-2 ring-gray-400 focus:ring-green-600 focus:outline-none  rounded-xl px-4 py-2">
            <option value="">All Users</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
           <button onClick={handleClick} className="bg-green-700 text-white p-2 px-[13px] rounded-full"><FaSearch/></button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="w-full">
          <thead className="bg-gradient-to-r from-green-900 to-[#2eaf7d] text-white rounded">
            <tr className=" border-b">
              <th className="text-left p-4 font-semibold">
                User
              </th>

              <th className="text-left p-4 font-semibold">
                Email
              </th>

              <th className="text-left p-4 font-semibold">
                Role
              </th>

              <th className="text-left p-4 font-semibold">
                Status
              </th>

              <th className="text-left p-4 font-semibold">
                Joined
              </th>

              <th className="text-center p-4 font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* User Info */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://cloth-exchange-backend.onrender.com${user.profilePicture}`}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {user.fullname}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ID #{user._id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="p-4 text-gray-600">
                  {user.email}
                </td>

                {/* Role */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full font-medium`}>
                    {user.userId.role}</span>
                  
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full font-medium
                    ${
                      user.userId?.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.userId?.status}
                  </span>
                </td>

                {/* Date */}
                <td className="p-4 text-gray-600">
                  {user.createdAt}
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex justify-center gap-2">

                    <button onClick={()=>viewProfile(user._id)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <Eye size={18} />
                    </button>

                    <button onClick={()=>banUser(user.userId._id)} className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100">
                      <FaBan size={18} />
                    </button>
                    {user.userId.status &&(
                    <button onClick={()=>unBlock(user.userId._id)} className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100">
                      <FaUnlock size={18} />
                    </button>
                    )}

                    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}