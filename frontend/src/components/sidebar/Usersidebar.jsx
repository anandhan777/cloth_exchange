import { useState } from "react";
import {useNavigate,NavLink} from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import {
  Menu,
  X,
  User,
  Shirt,
  Heart,
  MessageSquare,
  Settings,
  MessageCircle,
  
} from "lucide-react";


const Sidebar = ({profile}) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate=useNavigate();

  const menuItems = [
    {id:1,
      name: <h1>{profile.fullname}</h1>,
      icon: <img src={`https://cloth-exchange-backend.onrender.com${profile.profilePicture}`} className="h-10 w-10 object-cover rounded-full"/>,
         path:"/user/profile",
    },
   
    {id:3,
      name: "Wishlist",
      icon: <Heart size={20} />,
      path:"/user/wishlist",
    },
    {id:4,
      name: "chat history",
      icon:  <MessageCircle size={20} />,
      path:"/user/chatsection",
    },
    {id:5,
      name: "My listing",
      icon: <Shirt size={20} />,
      path:"/user/mylisting",
    },
    {id:6,
      name: "Swap request",
      icon:  <ArrowLeftRight size={20} />,
      path:"/user/notifications",
    },
    {id:6,
      name: "notification",
      icon: <MessageSquare size={20} />,
      path:"/user/usernotification",
    },
    {id:7,
      name: "feedback",
      icon: <MessageSquare size={20} />,
      path:"/user/feedback",
    }, 
    
   
  ];

  return (
    <>
      {/* Toggle Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-3 left-5 z-50  p-2 rounded-lg 
        ${isOpen ? "text-[#caf6c9]":"text-white"}`}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}

      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gradient-to-r from-[#02353c] to-[#145a13] shadow-lg z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0 overflow-hidden"}
        `}
      >
        <div className="pt-20 px-4">

          <h1 className="text-2xl font-bold text-[#caf6c9] mb-8">
            ReWear
          </h1>

          <nav className="space-y-2">
            {menuItems.map((item) => (
             <NavLink  key={item.id} to={item.path} ><button
                
                className="
                  w-full flex items-center gap-3
                  px-4 py-3 rounded-xl
                  hover:bg-green-50
                  text-white
                  hover:text-gray-700
                  transition
                "
            >
                {item.icon}
                <span>{item.name}</span>
              </button>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}

      <main
        className={`
          transition-all duration-300
          ${isOpen ? "ml-64" : "ml-0"}
        `}
      >
       
      </main>
    </>
  );
};

export default Sidebar;
