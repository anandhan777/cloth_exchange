import {useState,useEffect} from "react"
import {useParams,useNavigate} from "react-router-dom"
import {FaSearch } from "react-icons/fa";
import { Search } from "lucide-react";
import gsap from "gsap";
import {motion} from "framer-motion"
import {
  FaHeart,
  FaArrowRight,
  FaMapMarkerAlt,
  FaTshirt,
} from "react-icons/fa";

import axios from "axios";
const ListingCard = () => {
  const navigate=useNavigate()
  const [list,setList]=useState([]);
  const[search,setSearch]=useState("");
    useEffect(()=>{
        const fetchListing=async()=>{
          const token=localStorage.getItem("token");
            try{
                const res=await axios.get("http://localhost:5000/api/users/viewlisting",{headers:{Authorization:`Bearer ${token}`}});
                setList(res.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchListing();
    },[])

    useEffect(()=>{
      gsap.fromTo('.list-container',{
        y:80,
        opacity:0
      },{y:0,
        opacity:1,
        duration:0.5,
        stagger:0.3
      })
    })

    const swapRequest=(item)=>{
      const user=JSON.parse(localStorage.getItem("user"))
      console.log(user);
      navigate(`/user/swapselect`,{
        state:{
          receiverId:item.userId,
          receiverListingId:item._id,
          senderId:user._id,
        }
      });

    }
    const wishlist=async(id)=>{
        const user=JSON.parse(localStorage.getItem("user"))
      try{
        const data=axios.post(`http://localhost:5000/api/users/addtowishlist/${user._id}/${id}`);
        console.log(data);
      }catch(error){
        console.log(error);
      }
    }
    const collectdata=(item)=>{
      navigate(`/user/clothdetails`,{
        state:{
          id:item._id,
          name:item.userId.name,
          userId:item.userId,
          title:item.title,
          category:item.category,
          brand:item.brand,
          condition:item.condition,
          originalPrice:item.originalPrice,
          yearsUsed:item.yearsUsed,
          timesWorn:item.timesWorn,
          size:item.size,
          color:item.color,
          material:item.material,
          gender:item.gender,
          image:item.image,
          interestedCategories:item.interestedCategories,
          preferredSizes:item.preferredSizes,
          city:item.city,
          state:item.state,
          estimatedValue:item.estimatedValue,
          status:item.status,
        }
      })

    }
    const searchList=async()=>{
      const res=await axios.get(`http://localhost:5000/api/users/search?search=${search}`);
      setList(res.data);
    }
  return (
    <div className="bg-[#f9faf7]">
      <motion.div initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} transition={{duration:0.4}} className="text-green-900 pt-10  font-semibold text-3xl text-center">explore the items</motion.div>
 <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="relative flex pt-10 mx-20">
            
              <input
                type="text"
                placeholder="Search feedback..."
                value={search}
                
                onChange={(e)=>setSearch(e.target.value)}
                className="w-full rounded-full py-3 pl-10 pr-4 border-1 relative bg-white focus:outline-none ring-gray-300 ring-2 focus:outline-none focus:ring-green-600"
              />
              <FaSearch onClick={searchList} className="text-5xl bg-green-700 rounded-full   font-semibold text-white p-2 text-right "/>

            </motion.div>
<div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  h-screen
  gap-6
  py-10
  px-20
   "
>
   
  {list.map((item) => (
    <div
      key={item._id}
      className=" list-container group
      bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition h-[460px]"
    >
      <div>
      {/* Image */}
      <img
        src={`http://localhost:5000${item.image}`}
        alt={item.title}
        className="w-full h-54 object-cover relative group-hover:scale-110 duration-700"
      /><FaHeart onClick={()=>{wishlist(item._id),alert("item added to wishlist")}} className="absolute -mt-50 ml-4 text-black h-5 w-5"/></div>

      {/* Content */}
      <div className="p-4">

        <div className="flex justify-between">
          <h2 className="font-bold text-lg">
            {item.title}
          </h2>

          <span className="font-bold text-green-700">
           ₹{item.estimatedValue}
          </span>
        </div>

        <p className="text-gray-500">
          {item.brand}
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
            {item.category}
          </span>

          <span className="flex gap-2 items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
             <FaTshirt />
            {item.size}
          </span>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            {item.condition}
          </span>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <FaMapMarkerAlt />
          {item.city}, {item.state}
        </div>

        <div className="flex gap-2 mt-4">

          <button onClick={()=>collectdata(item)}
            className="flex items-center gap-5 bg-gradient-to-r px-8 from-green-900 to-[#2eaf7d] text-white py-2 rounded-xl">
            View  <FaArrowRight />
          </button>

          <button onClick={()=>swapRequest(item)}
            className="
            flex-1
            border
            border-green-700
            text-green-700
            py-2
            rounded-xl"
          >
            Swap
          </button>

        </div>

      </div>
    </div>
  ))}
</div>
</div>
    
  );
};

export default ListingCard;