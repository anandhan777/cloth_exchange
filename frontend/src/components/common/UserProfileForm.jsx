import { useState } from "react";

const ProfileForm = ({title,handleChange,handleSubmit,formdata}) => {
//   const [formData, setFormData] = useState({
//     profileImage: "",
//     fullName: "",
//     email: "",
//     phone: "",
//     location: "",
//     bio: "",
//     clothingSize: "",
//     favoriteCategory: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log(formData);

//     // API Call
//   };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl  shadow-sm p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">
          {title}
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your clothing exchange profile.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
        {/* Profile Image */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Profile Image
          </label>

          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="w-full border border-green-200 rounded-xl p-3
            focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            banner image
          </label>

          <input
            type="file"
            name="profileBanner"
            onChange={handleChange}
            className="w-full border border-green-200 rounded-xl p-3
            focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Basic Details */}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullname"
              value={formdata?.fullname||""}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border border-green-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formdata?.email||""}
              onChange={handleChange}
              placeholder="john@gmail.com"
              className="w-full border border-green-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formdata?.phone||""}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full border border-green-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formdata?.location||""}
              onChange={handleChange}
              placeholder="Kerala, India"
              className="w-full border border-green-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Bio */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Bio
          </label>

          <textarea
            rows="4"
            name="bio"
            value={formdata?.bio||""}
            onChange={handleChange}
            placeholder="Tell others about your style..."
            className="w-full border border-green-200 rounded-xl p-3
            focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Preferences */}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Preferred Size
            </label>

            <select
              name="preferredSize"
              value={formdata?.preferredSize||""}
              onChange={handleChange}
              className="w-full border border-green-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Size</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Favorite Category
            </label>

            <select
              name="favoriteCategory"
              value={formdata?.favoriteCategory || ""}
              onChange={handleChange}
              className="w-full border border-green-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              <option>T-Shirts</option>
              <option>Shirts</option>
              <option>Jeans</option>
              <option>Jackets</option>
              <option>Shoes</option>
            </select>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-6 py-3 border border-green-700
            text-green-700 rounded-xl"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-green-700 text-white
            rounded-xl hover:bg-green-800 transition"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;