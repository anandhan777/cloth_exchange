import axios from "axios";
import{useState,useEffect} from "react"
import { X } from "lucide-react";
import SuccessfulSwapChart from "../../common/SwapChart";
import {useNavigate} from "react-router-dom"


const AdminDashboard = () => {

  const [collection,setCollection]=useState({
    totalusers:0,totallisting:0,totalexchange:0,totalreport:0,userRequest:0,exchangeissue:0,pendingreview:0,treports:0,
  });
  const navigate=useNavigate();
  const[notification,setNotification]=useState([]);
  const[latest,setLatest]=useState({data:[],data1:[]});
  

  useEffect(()=>{
    const fetchCollection=async()=>{
      try{
      const [res,not,lat]=await Promise.all([ axios.get("http://localhost:5000/api/admin/totalcollections"),
        axios.get("http://localhost:5000/api/admin/globalnotification"),
         axios.get("http://localhost:5000/api/admin/latestlisting")
      ]);
      setCollection(res.data);
      setNotification(not.data);
      setLatest(lat.data);
      console.log(lat.data);
      }catch(error){
        console.log(error);
      }


    }
    fetchCollection();
},[])
const deletemsg=async(id)=>{
  await axios.delete(`http://localhost:5000/api/admin/deletemessage/${id}`);
  setNotification(pre=>pre.filter(m=>m._id!==id));
}
  return (
    <div className="flex-1 bg-[#faf9f5]  p-6 overflow-y-auto h-[720px] pl-20 py-15">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back, Admin 👋
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor your platform activity and performance.
          </p>
        </div>

        <button className="px-5 py-2 bg-green-700 text-white rounded-xl">
          Generate Report
        </button>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">Total Users</h3>
          <h2 className="text-3xl font-bold mt-2">{collection.totalusers}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">Listings</h3>
          <h2 className="text-3xl font-bold mt-2">{collection.totallisting}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">Exchanges</h3>
          <h2 className="text-3xl font-bold mt-2">{collection.totalexchange}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-500">Reported Items</h3>
          <h2 className="text-3xl font-bold mt-2 text-red-500">{collection.totalreport}</h2>
        </div>

      </section>

      {/* Charts & Activity */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6">
            <SuccessfulSwapChart width={600} height={300}/>    
        </div>

        {/* Activity */}
        <div className="bg-[#e0fdd4] rounded-2xl p-6 h-[554px] shadow-sm overflow-y-scroll">
          <h2 className="text-xl font-semibold mb-4">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {notification.map((m)=>(
            <div className="shadow rounded-4xl bg-white py-2 px-3 flex items-center justify-between">✓{m.message}<X size={15} onClick={()=>deletemsg(m._id)}/></div>
            ))}
          
          </div>
        </div>

      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

         
          <button onClick={()=>navigate("/admin/viewusers")} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md">
            Manage Users
          </button>

          <button onClick={()=>navigate("/admin/viewreport")} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md">
            View Reports
          </button>

          <button className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md">
            Send Notice
          </button>

          <button className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md">
            Settings
          </button>

        </div>
      </section>

      {/* Pending Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <h3 className="font-semibold">
            Pending Reviews
          </h3>

          <p className="text-3xl font-bold mt-2">{collection.pendingreview}</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <h3 className="font-semibold">
            Reported Listings
          </h3>

          <p className="text-3xl font-bold mt-2">{collection.treports}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="font-semibold">
            User Requests
          </h3>

          <p className="text-3xl font-bold mt-2">{collection.userRequest}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <h3 className="font-semibold">
            Exchange Issues
          </h3>

          <p className="text-3xl font-bold mt-2">{collection.exchangeissue}</p>
        </div>

      </section>

      {/* Tables */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Latest Listings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Latest Listings
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Item</th>
                  <th className="text-left py-3">category</th>
                  <th className="text-left py-3">owner</th>
                </tr>
              </thead>
             {latest?.data?.map(item=>(
              <tbody>
                <tr className="border-b">
                  <td className="py-3"><img src={`http://localhost:5000${item.image}`} className="w-12 h-12 rounded"/></td>
                  <td>{item.category}</td>
                  <td>{item.userId.name}</td>
                </tr>
              </tbody>
              ))}
            </table>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Top Categories
          </h2>
      
          <div className="space-y-4">
              {latest?.data1?.map(item=>(
            <div>{item.category} - {item.originalPrice}</div>))}
       
          </div>
        </div>

      </section>

    </div>
  );
};

export default AdminDashboard;