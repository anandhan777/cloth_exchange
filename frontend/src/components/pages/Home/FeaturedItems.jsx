import { useState } from "react";
// import "./FeaturedItems.css"
import {
  FaHeart,
  FaArrowRight,
  FaMapMarkerAlt,
  FaTshirt,
} from "react-icons/fa";
import {useEffect} from "react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);



const clothes = [
  {
    id: 1,
    title: "Denim Jacket",
    category: "Jackets",
    size: "L",
    location: "Chennai",
    likes: 52,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
  },
  {
    id: 2,
    title: "Casual Hoodie",
    category: "Hoodies",
    size: "M",
    location: "Bangalore",
    likes: 39,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
  },
  {
    id: 3,
    title: "White Shirt",
    category: "Shirts",
    size: "XL",
    location: "Delhi",
    likes: 65,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
  },
  {
    id: 4,
    title: "Winter Sweater",
    category: "Sweaters",
    size: "M",
    location: "Mumbai",
    likes: 74,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600",
  },
  // {
  //   id: 5,
  //   title: "Denim Jacket",
  //   category: "Jackets",
  //   size: "L",
  //   location: "Chennai",
  //   likes: 52,
  //   image:
  //     "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
  // },
  // {
  //   id: 6,
  //   title: "Casual Hoodie",
  //   category: "Hoodies",
  //   size: "M",
  //   location: "Bangalore",
  //   likes: 39,
  //   image:
  //     "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
  // },
  // {
  //   id: 7,
  //   title: "White Shirt",
  //   category: "Shirts",
  //   size: "XL",
  //   location: "Delhi",
  //   likes: 65,
  //   image:
  //     "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
  // },
  // {
  //   id: 8,
  //   title: "Winter Sweater",
  //   category: "Sweaters",
  //   size: "M",
  //   location: "Mumbai",
  //   likes: 74,
  //   image:
  //     "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600",
  // },
];

const FeaturedItems = () => {
  const [active, setActive] = useState("All");
   useEffect(()=>{
        gsap.fromTo(".head",{
            x:-50,
            opacity:0,
        },{
            x:0,
            opacity:1,
            duration:0.6,
              scrollTrigger:{
                trigger:".test-container",
                start:"top 80%",
                toggleActions:"play none none reset"

            }
        }),
        gsap.fromTo(".head1",{
            x:50,
            opacity:0,
        },{
            x:0,
            opacity:1,
            duration:0.6,
              scrollTrigger:{
                trigger:".feature-container",
                start:"top 50%",
                toggleActions:"play none none reset"

            }
        }),
        gsap.fromTo(".para",{
            x:-50,
            opacity:0,
        },{
            x:0,
            opacity:1,
            duration:0.6,
              scrollTrigger:{
                trigger:".feature-container",
                start:"top 50%",
                toggleActions:"play none none reset"

            }
        }),
        gsap.fromTo(".feature-list",{
            x:-50,
            opacity:0,
        },{
            x:0,
            opacity:1,
            duration:0.6,
            stagger:0.3,
              scrollTrigger:{
                trigger:".feature-container",
                start:"top 50%",
                toggleActions:"play none none reset"

            }
        })
    });

  return (
    <section className="py-12 bg-[#f9faf7]">

      <div className="feature-container max-w-7xl mx-auto px-8">

        {/* Heading */}

        <div className="text-center">

          <span className="head uppercase tracking-[6px] text-green-700 font-semibold">
            Featured Collection
          </span>

          <h2 className="head1 text-6xl font-bold text-green-800 mt-5">
            Popular Swaps
          </h2>

          <p className="para mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover clothing loved by our community. Find your next favorite
            outfit and start swapping sustainably.
          </p>

        </div>

        {/* Filters */}

        <div className="flex justify-center gap-4 mt-14 flex-wrap">

          {["All", "Shirts", "Jackets", "Hoodies", "Sweaters"].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`px-7 py-3 rounded-full font-semibold transition
              ${
                active === item
                  ? "bg-green-700 text-white"
                  : "bg-white border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {clothes.map((cloth) => (
            <div
              key={cloth.id}
              className="feature-list group  bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-3"
            >

              {/* Image */}

              <div className="relative overflow-hidden h-80">

                <img
                  src={cloth.image}
                  className="w-full h-full object-cover group-hover:scale-110 duration-700"
                />

                <div className="absolute top-4 right-4 bg-white p-3 rounded-full shadow">

                  <FaHeart className="text-red-500" />

                </div>

                <div className="absolute bottom-4 left-4 bg-green-700 text-white px-4 py-2 rounded-full text-sm">

                  {cloth.category}

                </div>

              </div>

              {/* Details */}

              <div className="p-6">

                <h3 className="text-2xl font-bold text-green-800">
                  {cloth.title}
                </h3>

                <div className="flex items-center gap-2 mt-4 text-gray-500">

                  <FaTshirt />

                  Size {cloth.size}

                </div>

                <div className="flex items-center gap-2 mt-3 text-gray-500">

                  <FaMapMarkerAlt />

                  {cloth.location}

                </div>

                <div className="flex justify-between items-center mt-8">

                  <div className="flex items-center gap-2 text-red-500 font-semibold">

                    <FaHeart />

                    {cloth.likes}

                  </div>

                  <button className="flex items-center gap-2 text-green-700 font-semibold group-hover:gap-4 duration-300">

                    View

                    <FaArrowRight />

                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Button */}

        <div className="flex justify-center mt-16">

          <button className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg transition flex items-center gap-3">

            Explore More

            <FaArrowRight />

          </button>

        </div>

      </div>

    </section>
  );
};

export default FeaturedItems;