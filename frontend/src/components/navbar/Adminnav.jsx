
// src/components/Navbar/HomeNavbar.jsx
import { NavLink } from "react-router-dom";

export default function Adminnav() {
  return (
    <div className="flex text-white px-6 py-4  items-center fixed w-full bg-green-900 fixed z-20" 
    >
      <h1 className="text-xl font-bold pl-8"></h1>
      <div className="">
        <NavLink to="/" className=" ml-[850px] px-3 py-2  hover:bg-green-500 hover:text-green-900 duration-300 rounded-full duration-300">Home</NavLink>

        <NavLink to="/admin/viewlisting" className="px-3 py-2  hover:bg-green-500 hover:text-green-900 duration-300 rounded-full duration-300">view listing</NavLink>
                <NavLink to="/admin/viewreport" className="px-3 py-2  hover:bg-green-500 hover:text-green-900 duration-300 rounded-full duration-300">view reports</NavLink>
                <NavLink to="/admin/swaphistory" className="px-3 py-2  hover:bg-green-500 hover:text-green-900 duration-300 rounded-full duration-300">swap history</NavLink>

        <NavLink to="/admin/viewusers" className="px-3 py-2  hover:bg-green-500 hover:text-blue-900 duration-300 rounded-full duration-300">users</NavLink>
        </div>
    </div>
  );
}
