
import {useState,useEffect} from "react"
import axios from "axios";
import { useParams } from "react-router-dom";

const Viewprofile = () => {
  const[profile,setProfile]=useState({});
  const {id}=useParams();

  useEffect(()=>{
    const token=localStorage.getItem("token");
    const fetchProfile=async()=>{
      const res=await axios.get(`https://cloth-exchange-backend.onrender.com/api/admin/viewprofile/${id}`);
      console.log(res.data);
      console.log(res.data);
      setProfile(res.data);

    }
    fetchProfile();
  },[])
 
  return (
    <div className="flex-1 p-6 bg-[#faf9f5]  min-h-screen overflow-y-auto pt-20 pl-16 ">

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
          <p className="text-3xl font-bold">42</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h3 className="text-gray-500">Exchanges</h3>
          <p className="text-3xl font-bold">28</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h3 className="text-gray-500">Rating</h3>
          <p className="text-3xl font-bold">4.9 ⭐</p>
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

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="border rounded-xl overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
                    alt=""
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-3">
                    <h3 className="font-semibold">
                      Cotton T-Shirt
                    </h3>

                    <p className="text-sm text-gray-500">
                      Size M • Good Condition
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

              <div className="border rounded-lg p-4 flex justify-between">
                <span>Vintage Jacket ↔ Denim Shirt</span>
                <span className="text-yellow-500">
                  Pending
                </span>
              </div>

              <div className="border rounded-lg p-4 flex justify-between">
                <span>White Hoodie ↔ Black Jeans</span>
                <span className="text-green-500">
                  Accepted
                </span>
              </div>

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
              <li>Denim Jacket</li>
              <li>Vintage T-Shirt</li>
              <li>Sneakers</li>
              <li>Hoodie</li>
            </ul>
          </section>

          {/* Reviews */}
          <section className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">
              Reviews
            </h2>

            <div className="space-y-4">

              <div>
                <p className="font-medium">
                  Sarah ⭐⭐⭐⭐⭐
                </p>
                <p className="text-sm text-gray-500">
                  Great exchange experience.
                </p>
              </div>

              <div>
                <p className="font-medium">
                  Mike ⭐⭐⭐⭐
                </p>
                <p className="text-sm text-gray-500">
                  Fast delivery and friendly communication.
                </p>
              </div>

            </div>
          </section>

        </div>

      </div>

    </div>
  );
};

export default Viewprofile;