import {useState,useEffect} from "react"
import {useParams,useNavigate} from "react-router-dom"
import {motion} from "framer-motion"


import axios from "axios";
const Wishlist = () => {
  const navigate=useNavigate()
  const [list,setList]=useState([]);
    useEffect(()=>{
        const fetchWishlist=async()=>{
            const token=localStorage.getItem("token");
            try{
                const res=await axios.get("https://cloth-exchange-backend.onrender.com/api/users/showwishlist",{headers:{Authorization:`Bearer ${token}`}});
                console.log(res.data);
                setList(res.data ||[]);
            }catch(error){
                console.log(error);
            }
        }
        fetchWishlist();
    },[])

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
    // const wishlist=async(id)=>{
    //     const user=JSON.parse(localStorage.getItem("user"))
    //   try{
    //     const data=axios.post(`https://cloth-exchange-backend.onrender.com/api/users/addtowishlist/${user._id}/${id}`);
    //     console.log(data);
    //   }catch(error){
    //     console.log(error);
    //   }
    // }
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
  return (<div ><motion.h1 initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:0.5}} className="bg-[#faf9f5] pt-8 text-center text-green-800 font-semibold text-3xl ">wishlist</motion.h1>

<div
  className="
  grid
  grid-cols-1
  h-screen
  md:grid-cols-2
  lg:grid-cols-3
  xl:grid-cols-4
  gap-6
  py-10
  px-20 
  bg-[#faf9f5]"
>
  
  {list.map((item) => (
    <div
      key={item._id}
      className="
      bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
    >
      <div>
      {/* Image */}
      <img
        src={`https://cloth-exchange-backend.onrender.com${item.image}`}
        alt={item.title}
        className="w-full h-54 object-cover relative"
      /></div>

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

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {item.size}
          </span>

          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            {item.condition}
          </span>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          {item.city}, {item.state}
        </div>

        <div className="flex gap-2 mt-4">

          <button onClick={()=>collectdata(item)}
            className="flex-1 bg-green-700 text-white py-2 rounded-xl">
            View
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

export default Wishlist;