import { useForm } from "react-hook-form";
import axios from "axios"
import {motion} from "framer-motion"
import Alert from "../../common/Alert";

const CreateListing = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit =async (data) => {

   
    const formdata=new FormData();

    formdata.append("title",data.title);
    formdata.append("category",data.category);
    formdata.append("brand",data.brand);
    if(data.image && data.image[0]){
    formdata.append("image",data.image[0]);
    }
    
    formdata.append("size",data.size)
    formdata.append("color",data.color);
    formdata.append("material",data.material);
    formdata.append("gender",data.gender);
    formdata.append("condition",data.condition);
    formdata.append("yearsUsed",data.yearsUsed);
    formdata.append("timesWorn",data.timesWorn);
    formdata.append("originalPrice",data.originalPrice);
    formdata.append("interestedCategories",data.interestedCategories);
    formdata.append("preferredSize",data.preferredSize);
    formdata.append("city",data.city);
    formdata.append("state",data.state);
    try{
       const token=localStorage.getItem("token");
    const res=await axios.post("https://cloth-exchange-backend.onrender.com/api/users/addlisting",formdata,{headers:{"content-Type":"multipart/form-data","Authorization":`Bearer ${token}`}})
    console.log(res.data);  
    }catch(error){
      console.log(error);
    }  
    reset();
    alert("item uploaded");
    <Alert type="success" message="item uploaded"/>
  };

  return (
   <div className=" bg-[#f9faf7]">
    <motion.div initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}} transition={{duration:0.3}} className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow">

      <h1 className="text-3xl font-bold mb-8 text-green-700">
        Add Cloth Listing
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        {/* Basic Details */}

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Basic Details
          </h2>

          <div className="grid md:grid-cols-2 gap-3">

            <input
              {...register("title")}
              placeholder="Title"
              className="border p-3 rounded-xl focus:ring-2 border-green-200 focus:outline-none focus:ring-green-500"
            />

            <select
              {...register("category")}
              className="border p-3 rounded-xl focus:ring-2 border-green-200  focus:outline-none focus:ring-green-500 "
            >
              <option value="">
                Select Category
              </option>

              <option className="hover:bg-[#2eaf7d]">T-Shirt</option>
              <option>Jeans</option>
              <option>Jacket</option>
              <option>Dress</option>
              <option>Hoodie</option>
            </select>

            <input
              {...register("brand")}
              placeholder="Brand"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            />
            <input {...register("image")}
            type="file"
            accept="image/*"
            className="border p-3 rounded-xl w-full focus:ring-2 border-green-200  focus:outline-none focus:ring-green-500"
          />

          </div>

        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Clothing Details
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">

            <input
              {...register("size")}
              placeholder="Size"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            />

            <input
              {...register("color")}
              placeholder="Color"
              className="border p-3 rounded-xl focus:ring-2 border-green-200  focus:outline-none focus:ring-green-500"
            />

            <input
              {...register("material")}
              placeholder="Material"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            />

            <select
              {...register("gender")}
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Unisex</option>
              <option>Kids</option>
            </select>

          </div>
        </div>

        {/* Value Section */}

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Condition & Value
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">

            <select
              {...register("condition")}
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            >
              <option>
                Select Condition
              </option>

              <option>New With Tags</option>
              <option>Like New</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
              <option>Poor</option>
            </select>

            <input
              type="number"
              {...register("originalPrice")}
              placeholder="Original Price"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            />

            <input
              type="number"
              {...register("yearsUsed")}
              placeholder="Years Used"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            />

            <input
              type="number"
              {...register("timesWorn")}
              placeholder="Times Worn"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500" 
            />

          </div>
        </div>

        {/* Swap Preferences */}

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Swap Preferences
          </h2>

          <div className="grid md:grid-cols-2 gap-3">

            <input
              {...register("interestedCategories")}
              placeholder="Interested Categories"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            />

            <input
              {...register("preferredSizes")}
              placeholder="Preferred Sizes"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            />

          </div>
        </div>

        {/* Location */}

        <div>
          <h2 className="text-xl font-semibold mb-2">
            Location
          </h2>

          <div className="grid md:grid-cols-2 gap-3">

            <input
              {...register("city")}
              placeholder="City"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            />

            <input
              {...register("state")}
              placeholder="State"
              className="border p-3 rounded-xl focus:ring-2  border-green-200 focus:outline-none focus:ring-green-500"
            />

          </div>
        </div>

        <button
          type="submit"
          className="
            bg-green-700
            text-white
            px-8
            py-3
            rounded-xl
            hover:bg-green-800
          "
        >
          Create Listing
        </button>

      </form>

    </motion.div>
    </div>
    
  );
};

export default CreateListing;