import React from 'react'
import{useEffect} from "react"
import hero from '../../../assets/Home_image/header.png'
import logo1 from '../../../assets/Home_image/logo1.png'
import { NavLink } from 'react-router-dom'
import HowItWorks from './HowItWorks'
import FeaturedItems from './FeaturedItems'
import Testimonials from './Testimonial'
import CTASection from './CallToAction'
import Footer from './Footer'
import gsap from "gsap"
import "./Homepage.css"

function Homepage() {
  useEffect(()=>{
    gsap.fromTo(".head1",{x:70,opacity:0},{x:0,opacity:1,duration:0.6}),
    gsap.fromTo(".head2",{x:-50,opacity:0},{x:0,opacity:1,dyration:0.6}),
    gsap.fromTo(".btn",{opacity:0,scale:0.6},{opacity:1,scale:1,duration:0.6})
  })
  return (
    <div style={{backgroundImage:`url(${hero})`, backgroundSize: 'cover', height:'825px', backgroundPosition: 'center'}}>
      <div >
         <div className=" flex items-center -mt-6 -pt-2" >
            <img src={logo1} alt="logo" className='w-55 h-38'/>
      
      <div className="">
        <NavLink to="/" className=" ml-[750px] px-3 py-2 hover:bg-green-600 hover:text-white duration-300 rounded-full font-semibold">Home</NavLink>
        <NavLink to="/howitworks" className="px-3 py-2  hover:bg-green-600 hover:text-white duration-300 rounded-full font-semibold">About</NavLink>
        <NavLink to="/contact" className="px-3 py-2 hover:bg-green-600 hover:text-white duration-300 rounded-full font-semibold">Contact</NavLink>
        <NavLink to="/feature" className="px-3 py-2 hover:bg-green-600 hover:text-white duration-300 rounded-full font-semibold">feature</NavLink>
       <NavLink to="/login"> <button  className="bg-white shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-green-900 hover:text-white text-green-900 duration-400 w-[100px] py-2 px-4 rounded-3xl hover:text-blue-900 ml-4" style={{border:"1px solid #00c3ff",boxshadow:"0 4px 12px rgba(0, 0, 255, 0.6)"}}>Login</button> </NavLink>
        <NavLink to="/register"> <button  className="bg-green-900 shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-white hover:text-green-900 text-white w-[100px] py-2 px-4 rounded-3xl" style={{border:"1px solid #00c3ff"}}>Sign Up</button> </NavLink>
      </div>
    </div>
    <div className=' flex flex-col items-start justify-center h-[500px] ml-15  px-20 gap-6 '>
        <h1 className='head1 w-[750px] text-6xl bg-gradient-to-r from-green-900 to-green-500 bg-clip-text text-transparent font-serif font-semibold'>Refresh your wardrobe sustain your plants</h1>
        <p className='head2 w-[500px] text-green-900 font-serif text-2xl'>we exchanged cloths,reduced waste and embrace sustainable fashion with our trusted communiy</p>
        <div className="btn flex gap-2">
        <button className="bg-green-900 shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-white hover:text-green-900 text-white w-[200px] py-2 px-4 rounded-3xl mt-2 text-2xl" style={{border:"1px solid #00c3ff"}}>Get Started</button>
        <button className="bg-transparent shadow-[0_0_10px_rgba(59,130,246,0.7)] border-2 border-green-900 hover:bg-white hover:text-green-900 text-green-900 w-[200px] py-2 px-4 rounded-3xl mt-2 text-2xl" >how its work</button>
        </div>
    </div>
   </div>
   <HowItWorks/>
   <FeaturedItems/>
   <Testimonials/>
   <CTASection/>
   <Footer/>
    </div>
  )
}

export default Homepage