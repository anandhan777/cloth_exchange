import {
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";
import {useEffect} from "react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all";
import "./Testimonial.css";

gsap.registerPlugin(ScrollTrigger);



const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Chennai",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "I swapped three dresses that I never wore and found two amazing outfits. The process was simple and the community is wonderful!",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    location: "Bangalore",
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Instead of buying new clothes every month, I now exchange them through SwapIt. It saves money and helps reduce fashion waste.",
  },
  {
    id: 3,
    name: "Emily Davis",
    location: "Mumbai",
    image:
      "https://randomuser.me/api/portraits/women/21.jpg",
    review:
      "The quality of the clothes exceeded my expectations. I love the secure swapping process and the friendly community.",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    location: "Chennai",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "I swapped three dresses that I never wore and found two amazing outfits. The process was simple and the community is wonderful!",
  },
  {
    id: 5,
    name: "Rahul Kumar",
    location: "Bangalore",
    image:
      "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Instead of buying new clothes every month, I now exchange them through SwapIt. It saves money and helps reduce fashion waste.",
  },
  {
    id: 6,
    name: "Emily Davis",
    location: "Mumbai",
    image:
      "https://randomuser.me/api/portraits/women/21.jpg",
    review:
      "The quality of the clothes exceeded my expectations. I love the secure swapping process and the friendly community.",
  },

];

const Testimonials = () => {
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
                trigger:".test-container",
                start:"top 80%",
                toggleActions:"play none none reset"

            }
        })
        gsap.fromTo(".para",{
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
        })
        gsap.fromTo(".list-item",{
            y:50,
            opacity:0,
        },{
            y:0,
            opacity:1,
            duration:0.6,
            stagger:0.3,
              scrollTrigger:{
                trigger:".test-container",
                start:"top 80%",
                toggleActions:"play none none reset"

            }
        })
    })
  return (
    <section className="relative py-12 bg-[#f8faf6] overflow-hidden">

      {/* Background Circles */}

      <div className="test-container absolute -left-24 top-0 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-40"></div>

      <div className="absolute right-0 bottom-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-8 relative">

        {/* Heading */}

        <div className="text-center">

          <p className="head uppercase tracking-[5px] text-green-700 font-semibold">
            COMMUNITY VOICES
          </p>

          <h2 className="head1 text-6xl font-bold text-green-800 mt-4">
            Loved by Our Community
          </h2>

          <p className="para text-xl text-gray-600 max-w-3xl mx-auto mt-6 leading-9">
            Thousands of people are giving their clothes a second life while
            helping build a more sustainable future.
          </p>

        </div>

        {/* Cards */}

        <div className="container grid lg:grid-cols-9  mt-20">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="list-item group relative w-100 bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-green-100 hover:-translate-y-3 hover:shadow-2xl duration-500"
            >

              {/* Quote */}

              <div className="absolute -top-6 left-8">

                <div className="w-14 h-14 rounded-full bg-green-700 flex justify-center items-center shadow-lg">

                  <FaQuoteLeft className="text-white text-xl" />

                </div>

              </div>

              {/* Rating */}

              <div className="flex gap-1 mt-8">

                {[1,2,3,4,5].map((star)=>(
                  <FaStar
                    key={star}
                    className="text-yellow-400 text-lg"
                  />
                ))}

              </div>

              {/* Review */}

              <p className="mt-8 text-gray-600 leading-8 text-lg">
                "{item.review}"
              </p>

              {/* User */}

              <div className="flex items-center gap-4 mt-10">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-green-100"
                />

                <div>

                  <h4 className="font-bold text-xl text-green-800">
                    {item.name}
                  </h4>

                  <p className="text-gray-500">
                    {item.location}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Statistics */}

        <div className="mt-24 bg-white rounded-3xl shadow-xl py-10">

          <div className="grid md:grid-cols-4 text-center">

            <div>
              <h2 className="text-5xl font-bold text-green-700">5K+</h2>
              <p className="text-gray-600 mt-2">Registered Users</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-green-700">12K+</h2>
              <p className="text-gray-600 mt-2">Clothes Swapped</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-green-700">98%</h2>
              <p className="text-gray-600 mt-2">Positive Reviews</p>
            </div>

            <div>
              <h2 className="text-5xl font-bold text-green-700">20 Tons</h2>
              <p className="text-gray-600 mt-2">Textile Waste Saved</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Testimonials;