import React, { useState } from "react";
import {
  MessageSquareWarning,
  Send,
  Upload,
} from "lucide-react";
import axios from "axios"
import {motion} from "framer-motion"

const FeedbackReportForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "Medium",
    description: "",
  });



  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    const token=localStorage.getItem("token");
    e.preventDefault();
    try{
    const res=await axios.post("http://localhost:5000/api/admin/addfeedback",formData,{headers:{Authorization:`Bearer ${token}`}});
    console.log(res.data)
    alert("feedback send to admin");
    }catch(error){
        console.log(error);
    }


   

    
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] p-6 pt-10">
      <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{duration:0.6}}className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <MessageSquareWarning
              className="text-green-600"
              size={30}
            />

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Submit Feedback / Report
              </h1>

              <p className="text-slate-500">
                Report issues, suggest improvements,
                or share feedback with the SkillHub team.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm p-8 space-y-6"
        >
          {/* Subject */}
          <div>
            <label className="block mb-2 font-medium">
              Subject
            </label>

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter report subject"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Bug">
                  Bug Report
                </option>

                <option value="UserRequest">
                  user Request
                </option>

                <option value="ExchangeIssue">
                  exchange issue
                </option>


                <option value="General">
                  General Feedback
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
               
              </select>
            </div>
          </div>

        
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain your issue or feedback..."
              className="w-full border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          
          <button
            type="submit"
            className=" group w-full bg-green-700 hover:bg-green-900 duration-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
          >
            <Send size={18} className="group-hover:rotate-360 transition-transform  duration-200"/>
            Submit Report
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default FeedbackReportForm;