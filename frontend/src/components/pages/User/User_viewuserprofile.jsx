
import {useState,useEffect} from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import {motion} from "framer-motion"

const User_Viewprofile = () => {
  const[profile,setProfile]=useState({});
  const {id}=useParams();
 const[collection,setCollection]=useState({list:0,exchange:0,wishlist:{}});
 const[rating,setRating]=useState({totalrating:0,totalreviews:0,average:0,dat1:[]});
const[cloth,setCloth]=useState([]);
const[request,setRequest]=useState([]);
  useEffect(()=>{
    const token=localStorage.getItem("token");
    const fetchProfile=async()=>{
        try{
      
      const[res,lreq,lcloth,calc,coll]=await Promise.all([axios.get(`https://cloth-exchange-backend.onrender.com/api/users/userviewprofile/${id}`),
        await axios.get(`https://cloth-exchange-backend.onrender.com/api/users/alatestrequest/${id}`),
        await axios.get(`https://cloth-exchange-backend.onrender.com/api/users/alatestclothlisting/${id}`),
      await axios.get(`https://cloth-exchange-backend.onrender.com/api/users/calculaterating/${id}`),
     await axios.get(`https://cloth-exchange-backend.onrender.com/api/users/collection/${id}`)]);
      setProfile(res.data);
      setRating(calc.data);
      setCollection(coll.data);
      setCloth(lcloth.data);
      setRequest(lreq.data);
        }catch(error){
            console.log(error);         
    }
}
    fetchProfile();
  },[])
  return (
    <div>
    <motion.div initial={{scale:0.8,opacity:0.5}} animate={{scale:1,opacity:1}} transition={{duration:0.4}}className="flex-1 p-6 bg-gray-50 min-h-screen overflow-y-auto pl-16 ">

      {/* Profile Header */}
      <section className="bg-white rounded-2xl overflow-hidden shadow mb-6 relative">
        <div className=" h-64">
          <img
            src={`https://cloth-exchange-backend.onrender.com${profile.profileBanner}`}
            
            className="w-full h-full object-cover  "
          />

          <div className="absolute bottom-6 left-8 flex items-center gap-6">
            <img
              src={`https://cloth-exchange-backend.onrender.com${profile.profilePicture}`}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-white"
            />

            <div>
              <h1 className="text-3xl font-bold text-white">
                {profile.fullname}
              </h1>
              <p className="text-white">
                {profile.location} • Member Since 2023
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-xl p-5 shadow">
          <h3 className="text-gray-500">Items Listed</h3>
          {/* <p className="text-3xl font-bold">{collection.list}</p> */}
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h3 className="text-gray-500">Exchanges</h3>
          <p className="text-3xl font-bold">{collection.exchange}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h3 className="text-gray-500">Rating</h3>
          <p className="text-3xl font-bold">{rating.average} ⭐</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h3 className="text-gray-500">Textile Saved</h3>
          <p className="text-3xl font-bold">310kg</p>
        </div>

      </section>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side */}
        <div className="lg:col-span-8 space-y-6">

          {/* Listings */}
          <section className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              My Clothing Listings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

              {cloth.map((item) => (
                <div
                  key={item}
                  className="border rounded-xl overflow-hidden"
                >
                  <img
              src={`https://cloth-exchange-backend.onrender.com${item.image}`}
                    alt=""
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-3">
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.size}• {item.consition}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* Exchange Requests */}
          <section className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Exchange Requests
            </h2>

            <div className="space-y-4">

             {request.map((item)=>(
              <div key={item._id} className="border rounded-lg p-4 flex justify-between">
                <span>{item.senderListingId?.title} ↔ {item.receiverListingId?.title}</span>
                <span className="text-yellow-500">
                  {item.status}
                </span>
              </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Side */}
        <div className="lg:col-span-4 space-y-6">

          {/* Impact */}
          <section className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Sustainability Impact
            </h2>

            <div className="space-y-3">
              <p>🌱 CO₂ Saved: 210kg</p>
              <p>💧 Water Saved: 128L</p>
              <p>♻️ Waste Diverted: 310kg</p>
            </div>
          </section>

          {/* Wishlist */}
          <section className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Wishlist
            </h2>

            <ul className="space-y-2">
              {collection?.wishlist?.wishlist?.map(item=>(
              <li>{item.title}</li>
              ))}
            
            </ul>
          </section>

          {/* Reviews */}
          <section className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Reviews
            </h2>

            <div className="space-y-4">

              {rating?.dat1?.map(item=>(
              <div>
                <p className="font-medium">
                  {item.senderId.name} {"⭐".repeat(item.rating)}
                </p>
                <p className="text-sm text-gray-500">
                  {item.feedback}
                </p>
              </div>
              ))}
            </div>
          </section>

        </div>

      </div>

    </motion.div>
    </div>
  );
};

export default User_Viewprofile;