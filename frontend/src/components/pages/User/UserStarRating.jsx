import React, { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { useLocation,useNavigate} from "react-router-dom";
import {motion} from "framer-motion"


const UserStarRating = () => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const[review,setReview]=useState("");
  const [feedback, setFeedback] = useState("");
  const location=useLocation();
  const navigate=useNavigate();
  const currentuser=location.state;

  const setRatingstar=(star)=>{
    setRating(star);
    switch(star){
        case 1 :
            setReview("poor_experience");
            break;
        case 2 :
            setReview("fair_experience");
            break;
        case 3 :
            setReview("good_experience");
            break;
        case 4 :
            setReview("verygood_experience");
            break;
        case 5 :
            setReview("excellent_experience");
            break;
        default:
            return setReview("");
    }
  }

  const sendFeedback=async()=>{
    await axios.post(`http://localhost:5000/api/users/addstarrating`,{receiverId:currentuser.receiverId,senderId:currentuser.senderId,rating:rating,review:review,feedback:feedback});

    alert("thank you for your response");
    navigate(-1);
  }

  return (
    <motion.div initial={{scale:0.6,opacity:0.4}} animate={{scale:1,opacity:1}} transition={{duration:0.2}} className="hover:shadow-2xl hover:scale-101 duration-300 max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border p-8 mt-15">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Rate Your Mentor
        </h2>
        <p className="text-gray-500 mt-2">
          Share your experience and help us improve the mentoring experience.
        </p>
      </div>

      {/* Star Rating */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Overall Rating
        </label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRatingstar(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            >
              <Star
                size={35}
                className={`transition-all duration-200 ${
                  star <= (hovered || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        <p className="mt-3 text-sm text-gray-500">
          {rating === 1 && "Poor Experience"}
          {rating === 2 && "Fair Experience"}
          {rating === 3 && "Good Experience"}
          {rating === 4 && "Very Good Experience"}
          {rating === 5 && "Excellent Experience"}
        </p>
      </div>

      {/* Feedback */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Feedback
        </label>

        <textarea
          rows="5"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Tell us about your experience with the mentor..."
          className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button onClick={sendFeedback}
        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition-all duration-200"
      >
        Submit Feedback
      </button>
    </motion.div>
  );
};

export default UserStarRating;