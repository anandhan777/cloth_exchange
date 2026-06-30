import { useState } from "react";
import {useNavigate,NavLink} from "react-router-dom";
import {
  Menu,
  X,
  User,
  Shirt,
  Heart,
  MessageSquare,
  Settings,
} from "lucide-react";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate=useNavigate();

  const menuItems = [
   
  
    {
      name: "view feedback",
      icon: <MessageSquare size={20} />,
      path:"/admin/viewfeedback",
    },
    {
      name: "notification",
      icon: <Settings size={20} />,
      path:"/admin/notification",
    },
  ];

  return (
    <>
      {/* Toggle Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-3 left-5 z-50  p-2 rounded-lg 
        ${isOpen ? "text-green-900":"text-white"}`}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}

      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white shadow-lg z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-0 overflow-hidden"}
        `}
      >
        <div className="pt-20 px-4">

          <h1 className="text-2xl font-bold text-green-700 mb-8">
            ReWear
          </h1>

          <nav className="space-y-2">
            {menuItems.map((item) => (
             <NavLink to={item.path} ><button
                key={item.name}
                className="
                  w-full flex items-center gap-3
                  px-4 py-3 rounded-xl
                  hover:bg-green-50
                  text-gray-700
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
