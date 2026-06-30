import {FaUpload, FaSearch,FaExchangeAlt, FaLeaf, FaUsers, FaShieldAlt, FaRecycle, FaArrowRight,} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
   useEffect(()=>{
          gsap.fromTo(".word",{
              x:-50,
              opacity:0,
          },{
              x:0,
              opacity:1,
              duration:0.8,
              stagger:0.3,
                scrollTrigger:{
                  trigger:".feature-container",
                  start:"top 80%",
                  toggleActions:"play none none reset"
  
              }
          }),
          gsap.fromTo(".para",{
              x:50,
              opacity:0,
          },{
              x:0,
              opacity:1,
              duration:0.6,
                scrollTrigger:{
                  trigger:".feature-container",
                  start:"top 80%",
                  toggleActions:"play none none reset"
  
              }
          }),
          gsap.fromTo(".container1",{
              y:-50,
              opacity:0,
          },{
              y:0,
              opacity:1,
              duration:0.6,
                scrollTrigger:{
                  trigger:".feature-container",
                  start:"top 80%",
                  toggleActions:"play none none reset"
  
              }
          })
   });
  return (
    <section className="relative py-12 bg-[#faf9f5] overflow-hidden">
      <div className="feature-container absolute top-20 left-0 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="text-center mb-20">
          <p className="text-green-700 font-semibold tracking-widest uppercase">
            HOW IT WORKS
          </p>
          <h2 className="mt-4 text-6xl font-bold text-green-800 leading-tight">
            <span className="word">Swap.</span><span className="word">Style.</span> <span className="word"> Sustain.</span>
          </h2>
          <p className=" para mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-9">
            Refresh your wardrobe in three simple steps while helping reduce
            fashion waste and building a sustainable community.
          </p>
        </div>
        <div className="container1 grid lg:grid-cols-3 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700 shadow-lg">
              01
            </div>
            <div className="bg-white rounded-[35px] shadow-xl p-10 pt-20 hover:-translate-y-3 duration-300 border border-green-100">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <FaUpload className="text-5xl text-green-700" />
              </div>
              <h3 className="text-3xl font-bold text-green-800 mt-8 text-center">
                Upload Clothes
              </h3>
              <p className="text-gray-600 text-lg mt-5 leading-8 text-center">
                Upload clothes you no longer wear by adding images, category,
                size and condition.
              </p>
            </div>
            <div className="hidden lg:flex absolute top-1/2 -right-10 text-green-600 text-4xl">
              <FaArrowRight />
            </div>
          </div>
         <div className="relative group">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700 shadow-lg">
              02
            </div>
            <div className="bg-white rounded-[35px] shadow-xl p-10 pt-20 hover:-translate-y-3 duration-300 border border-green-100">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <FaSearch className="text-5xl text-green-700" />
              </div>
              <h3 className="text-3xl font-bold text-green-800 mt-8 text-center">
                Browse Wardrobes
              </h3>
              <p className="text-gray-600 text-lg mt-5 leading-8 text-center">
                Explore clothing shared by other members and discover your next
                favorite outfit.
              </p>

            </div>
            <div className="hidden lg:flex absolute top-1/2 -right-10 text-green-600 text-4xl">
              <FaArrowRight />
            </div>

          </div>
          <div className="relative group">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl font-bold text-green-700 shadow-lg">
              03
            </div>
            <div className="bg-white rounded-[35px] shadow-xl p-10 pt-20 hover:-translate-y-3 duration-300 border border-green-100">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <FaExchangeAlt className="text-5xl text-green-700" />
              </div>
              <h3 className="text-3xl font-bold text-green-800 mt-8 text-center">
                Swap Securely
              </h3>
              <p className="text-gray-600 text-lg mt-5 leading-8 text-center">
                Request a swap, chat with the owner and exchange your clothes
                safely.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-24 bg-white rounded-3xl shadow-lg py-10 px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
             <FaRecycle className="text-green-700 text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-green-800"> Reduce Waste</h4>
                <p className="text-gray-500">Give clothes a second life</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <FaLeaf className="text-green-700 text-2xl" />
              </div>
              <div>
              <h4 className="font-bold text-xl text-green-800">Eco Friendly</h4>
                <p className="text-gray-500">Support sustainable fashion.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <FaUsers className="text-green-700 text-2xl" />
              </div>
             <div>
                <h4 className="font-bold text-xl text-green-800">Community</h4>
                <p className="text-gray-500"> Connect with fashion lovers.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <FaShieldAlt className="text-green-700 text-2xl" />
              </div>
              <div>
                <h4 className="font-bold text-xl text-green-800"> Safe Swaps</h4>
                <p className="text-gray-500">Secure exchange process.</p></div></div></div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;