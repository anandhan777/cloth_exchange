
import {useState,useEffect} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const[profile,setProfile]=useState({});
  const[request,setRequest]=useState([]);
  const[cloth,setCloth]=useState([]);
  const[rating,setRating]=useState({totalrating:0,totalreviews:0,average:0,dat1:[]});

  const[collection,setCollection]=useState({list:0,exchange:0,wishlist:{}});
  const navigate=useNavigate()
  const user=JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    const token=localStorage.getItem("token");
    const fetchProfile=async()=>{
      const [res,lreq,lclo,rat,coll]=await Promise.all([axios.get("http://localhost:5000/api/users/getprofile",{headers:{Authorization:`Bearer ${token}`}}),
         await axios.get("http://localhost:5000/api/users/latestrequest",{headers:{Authorization:`Bearer ${token}`}}),
        await axios.get("http://localhost:5000/api/users/latestclothlisting",{headers:{Authorization:`Bearer ${token}`}}),
      await axios.get(`http://localhost:5000/api/users/calculaterating/${user._id}`),
      await axios.get(`http://localhost:5000/api/users/collection/${user._id}`)]);
      console.log(res.data);
      console.log(lreq.data);
      console.log(lclo.data);
      console.log(rat.data);
      console.log(coll.data);
     
      setProfile(res.data);
      setRequest(lreq.data);
      setCloth(lclo.data);
      setRating(rat.data);
      setCollection(coll.data);

    }
    fetchProfile();
  },[])
  return (
    <div className="flex-1 p-6 bg-[#faf9f5] min-h-screen overflow-y-auto pl-10 ">

      {/* Profile Header */}
      <section className="bg-white rounded-2xl overflow-hidden shadow mb-6">
        <div className="relative h-64">
          <img
            src={`http://localhost:5000${profile.profileBanner}`}
            
            className="w-full h-full object-cover"
          />
          <div className="flex justify-between">
          <div className="absolute bottom-6 left-8 flex items-center gap-6">
            <img
              src={`http://localhost:5000${profile.profilePicture}`}
              alt="profile"
              className="w-32 h-32 rounded-full border-4 object-cover border-white"
            />

            <div>
              <h1 className="text-3xl font-bold text-white">
                {profile.fullname}
              </h1>
              <p className="text-white">
                {profile.location} • Member Since 2023
              </p>
            </div>
             <button  className=" mt-20 ml-[880px] px-4 bg-transprent border-2 border-white text-white text-xl rounded-full py-1
             hover:bg-white hover:text-black duration-300" onClick={()=>navigate("/user/profileupdate")}>update</button>
          </div>
         
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-xl p-5 shadow hover:bg-slate-300 duration-300">
          <h3 className="text-gray-500">Items Listed</h3>
          <p className="text-3xl font-bold">{collection.list}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow hover:bg-slate-300 duration-300">
          <h3 className="text-gray-500">Exchanges</h3>
          <p className="text-3xl font-bold">{collection.exchange}</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow hover:bg-slate-300 duration-300">
          <h3 className="text-gray-500">Rating</h3>
          <p className="text-3xl font-bold">{rating.average} ⭐</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow hover:bg-slate-300 duration-300">
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
                  key={item._id}
                  className="border rounded-xl overflow-hidden"
                >
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt=""
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-3">
                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.size}• {item.condition}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* Exchange Requests */}
          <section  onClick={()=>navigate("/user/notifications")} className="bg-white rounded-2xl p-6 shadow h-63">
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
          <section className="group bg-white rounded-2xl p-6 shadow hover:bg-teal-400 hover:text-white duration-300">
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
          <section className="group relative z-10 bg-white rounded-2xl p-6 shadow hover:bg-teal-400 hover:text-white duration-300">
            <div className="flex">
            <h2 className="text-xl font-semibold mb-4">
              Wishlist
            </h2>
            <button onClick={()=>navigate("/user/wishlist")} className="opacity-0 absolute group-hover:opacity-100 transition-opacity text-xl ml-90 rounded-full px-2 border-2 border-white b">view</button>
            </div>

            <ul className="space-y-2">
              {collection?.wishlist?.wishlist?.map(item=>(
              <li>{item.title}</li>
              ))}
            
            </ul>
            
          </section>

          {/* Reviews */}
          <section className="group bg-white rounded-2xl p-6 shadow hover:bg-teal-400 hover:text-white">
            <div className="flex">
            <h2 className="text-xl font-semibold mb-4">
              Reviews
            </h2>
             <button onClick={()=>navigate("/user/reviewlisting")} className="opacity-0 absolute group-hover:opacity-100 transition-opacity text-xl ml-90 rounded-full px-2 border-2 border-white b">view</button>
            </div>
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

    </div>
  );
};

export default ProfilePage;