const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true,required:true},
    password:{type:String},
    googleId:{type:String},
    role:{type:String,enum:["user","admin"],default:"user"},
    status:{type:String,enum:["active","suspended"],default:"active"},
    isProfile:{type:Boolean,default:false},
    
},{timestamps:true});

const User=mongoose.model("User",UserSchema);

const UserProfileSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    fullname:{type:String},
    email:{type:String},
    profilePicture:{type:String},
    profileBanner:{type:String},
    phone:{type:String},
    location:{type:String},
    bio:{type:String},
    preferredSize:{type:String},
    favoriteCategory:{type:String},
    wishlist:[{type:mongoose.Schema.Types.ObjectId,ref:"ClothListing"}],
},{timestamps:true});

const UserProfile=mongoose.model("UserProfile",UserProfileSchema);



const clothListingSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.Types.ObjectId,ref:"User",required: true, },

    title: {type: String,required: true,trim: true,},

    category: {type: String,required: true,},

    brand: {type: String, required: true,},

    condition: {type: String,enum: ["New With Tags", "Like New","Excellent","Good","Fair","Poor",], required: true,},

    originalPrice: {type: Number,required: true,},

    yearsUsed: {type: Number,default: 0,},

    timesWorn: {type: Number,default: 0,},

    size: {type: String,required: true,},

    color: {type: String,required: true,},

    material: {type: String,},

    gender: {type: String,enum: ["Men", "Women", "Unisex", "Kids"], },
    image: {type: String,},

    interestedCategories: [{type: String,},],

    preferredSizes: [{ type: String, },],

    city: String,
    state: String,

    estimatedValue: {type: Number,default: 0,},

    status: {type: String,enum: ["Available", "Reserved", "Swapped"],default: "Available",},
  },
  { timestamps: true }
);

const ClothListing = mongoose.model("ClothListing", clothListingSchema);

const StarratingSchema=new mongoose.Schema({
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    receiverId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    rating:{type:String,enum:[1,2,3,4,5],default:1},
    review:{type:String,enum:['poor_experience','fair_experience','good_experience','verygood_experience','excellent_experience'],default:"poor_experience"},
    feedback:{type:String}

},{timestamps:true});

const StarRating=mongoose.model("StarRating",StarratingSchema);


module.exports={User,UserProfile,ClothListing,StarRating};