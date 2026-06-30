
// src/components/Navbar/HomeNavbar.jsx
import { NavLink } from "react-router-dom";

export default function Usernav() {
  return (
    <div className="flex text-white px-6 py-4  items-center  w-full" style={{ background: "linear-gradient(to right, #02353c, #449342,#2eaf7d)" }}>
      <h1 className="text-xl font-bold pl-8"></h1>
      <div className="">
        <NavLink to="/" className=" ml-[850px] px-3 py-2  hover:bg-green-500 hover:text-green-900 duration-300 rounded-full duration-300">Home</NavLink>
        <NavLink to="/user/createlisting" className="px-3 py-2  hover:bg-green-500 hover:text-green-900 duration-300 rounded-full duration-300">upload listing</NavLink>
        <NavLink to="/user/viewlisting" className="px-3 py-2  hover:bg-green-500 hover:text-blue-900 duration-300 rounded-full duration-300">viewlisting</NavLink>
        <NavLink to="/user/swaphistory" className="px-3 py-2  hover:bg-green-500 hover:text-green-900 duration-300 rounded-full duration-300">swap history</NavLink>
        <NavLink to="/user/reviewlisting" className="px-3 py-2  hover:bg-green-500 hover:text-blue-900 duration-300 rounded-full duration-300">Review</NavLink>
        </div>
    </div>
  );
}
