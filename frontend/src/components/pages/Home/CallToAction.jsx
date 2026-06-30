import {FaArrowRight,FaLeaf,FaUsers,FaShieldAlt,} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {useEffect} from "react"
gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    useEffect(()=>{
        gsap.fromTo(".title",{
            y:50,
            opacity:0,
        },{
            y:0,
            opacity:1,
            duration:0.8,
            scrollTrigger:{
                trigger:".cta-container",
                start:"top 80%",
                toggleActions:"play none none reset"

            }
        }),
        gsap.fromTo(".para",{
            y:50,
            opacity:0,
        },{
            y:0,
            opacity:1,
            duration:0.8,
            scrollTrigger:{
                trigger:".cta-container",
                start:"top 80%",
                toggleActions:"play none none reset"

            }
        }),
        gsap.fromTo(".btn",{
            scale:0.4,
            opacity:0,
        },{
            opacity:1,
            scale:1,
            duration:0.6,
              scrollTrigger:{
                trigger:".cta-container",
                start:"top 80%",
                toggleActions:"play none none reset"

            }
        })

    })
  return (
    <section className="cta-container relative py-16 overflow-hidden bg-gradient-to-br from-green-700 via-green-800 to-green-900">
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-green-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-20 w-[500px] h-[500px] bg-green-300 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-24 left-1/4 w-6 h-6 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-20 right-1/4 w-10 h-10 bg-white/10 rounded-full"></div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">

        <div className="text-center">

          <span className=" title inline-block px-5 py-2 rounded-full bg-white/15 text-green-100 font-semibold tracking-wider uppercase backdrop-blur-md">
            Join the Movement
          </span>

          <h2 className="title text-6xl lg:text-7xl font-bold text-white mt-8 leading-tight">
            Ready to Refresh
            <br />
            Your Wardrobe?
          </h2>

          <p className="para text-green-100 text-xl leading-9 mt-8 max-w-3xl mx-auto">
            Give your unused clothes a second life, discover amazing fashion
            from others, and become part of a growing community making
            sustainable fashion simple.
          </p>

          {/* Buttons */}

          <div className="flex flex-wrap justify-center gap-6 mt-14">

            <button className="btn group bg-white text-green-700 px-10 py-5 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-2xl flex items-center gap-3">

              Get Started

              <FaArrowRight className="group-hover:translate-x-2 transition" />

            </button>

            <button className="btn border-2 border-white text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-white hover:text-green-700 transition-transform duration-300">

              Learn More

            </button>

          </div>

          {/* Trust Badges */}

          <div className="flex flex-wrap justify-center gap-10 mt-16">

            <div className="flex items-center gap-3 text-white">

              <div className="w-12 h-12 rounded-full bg-white/15 flex justify-center items-center backdrop-blur-md">

                <FaUsers className="text-xl" />

              </div>

              <div className="text-left">

                <h4 className="font-bold text-lg">Growing Community</h4>

                <p className="text-green-100 text-sm">
                  Thousands of active swappers
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 text-white">

              <div className="w-12 h-12 rounded-full bg-white/15 flex justify-center items-center backdrop-blur-md">

                <FaShieldAlt className="text-xl" />

              </div>

              <div className="text-left">

                <h4 className="font-bold text-lg">Safe Exchanges</h4>

                <p className="text-green-100 text-sm">
                  Secure and trusted swaps
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3 text-white">

              <div className="w-12 h-12 rounded-full bg-white/15 flex justify-center items-center backdrop-blur-md">

                <FaLeaf className="text-xl" />

              </div>

              <div className="text-left">

                <h4 className="font-bold text-lg">Eco-Friendly</h4>

                <p className="text-green-100 text-sm">
                  Reduce textile waste together
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTASection;