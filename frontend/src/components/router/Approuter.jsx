import React from 'react'
import {Routes,Route} from 'react-router-dom'
import HomeLayout from '../layout/HomeLayout'
import AdminLayout from '../layout/AdminLayout'
import UserLayout from '../layout/UserLayout'
import Homepage from '../pages/Home/Homepage'
import Login from '../pages/Home/Login'
import Register from '../pages/Home/Register'
import UserPage from '../pages/User/UserPage'
import ProfilePage from '../pages/User/User_profileview'
import User_profilecreate from "../pages/User/User_profilecreate"
import AdminDashboard from '../pages/Admin/Admin_dashboard'
import UserTable from '../pages/Admin/Admin_viewusers'
import Viewprofile from '../pages/Admin/Viewprofile'
import CreateListing from '../pages/User/User_ListingCloths'
import ListingCard from '../pages/User/View_listing'
import Mylisting from '../pages/User/Mylisting'
import Swapselecting from '../pages/User/Swapselecting'
import NotificationsPage from '../pages/User/Notification'
import ClothDetails from '../pages/User/Clothdetails'
import ChatPage from '../pages/User/Chatpage'
import Wishlist from '../pages/User/Wishlist'
import ChatSection from '../pages/User/ChatRooms'
import User_profileupdate from '../pages/User/User_profileupdate'
import Admin_viewListing from '../pages/Admin/Admin_viewListing'
import Aview_clothdetails from '../pages/Admin/Aview_clothdetails'
import FeedbackReportForm from '../pages/User/Send_feedback'
import Admin_viewFeedback from '../pages/Admin/Admin_viewFeedback'
import UserStarRating from '../pages/User/UserStarRating'
import Review_listing from '../pages/User/Review_listing'
import GoogleSuccess from '../pages/User/GoogleSuccess'
import ViewReports from '../pages/Admin/ViewReport'
import Review_itemreport from '../pages/Admin/Review_itemreport'
import HowItWorks from '../pages/Home/HowItWorks'
import CTASection from '../pages/Home/CallToAction'
import FeaturedItems from '../pages/Home/FeaturedItems'
import User_Viewprofile from '../pages/User/User_viewuserprofile'
import SwapHistory from '../pages/User/SwapHistory'
import NotificationPage from '../pages/User/User_notification'
import Admin_NotificationPage from '../pages/Admin/Admin_notification'
import SwapHistoryView from '../pages/Admin/SwapHistoryView'
function Approuter() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<HomeLayout/>}>
            <Route index element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/google-success" element={<GoogleSuccess/>}/>
            <Route path="/howitworks" element={<HowItWorks/>}/>
            <Route path="/feature" element={<FeaturedItems/>}/>
            <Route path="/contact" element={<CTASection/>}/>
            </Route>
            
            
            <Route path="/admin" element={<AdminLayout/>}>
            <Route index element={<AdminDashboard/>}/>
            <Route path="/admin/viewusers" element={<UserTable/>}/>
            <Route path="/admin/viewusers/viewprofile/:id" element={<Viewprofile/>}/>
            <Route path="/admin/viewlisting" element={<Admin_viewListing/>}/>
            <Route path="/admin/viewclothdetails" element={<Aview_clothdetails/>}/>
            <Route path="/admin/viewfeedback" element={<Admin_viewFeedback/>}/>
            <Route path="/admin/viewreport" element={<ViewReports/>}/>
            <Route path="/admin/reviewitem/:id" element={<Review_itemreport/>}/>
            <Route path="/admin/notification" element={<Admin_NotificationPage/>}/>
            <Route path="/admin/swaphistory" element={<SwapHistoryView/>}/>
            

            </Route>
            <Route path="/user" element={<UserLayout/>}>
            <Route index element={<UserPage/>}/>
            <Route path="/user/profile" element={<ProfilePage/>}/>
            <Route path="/user/profilecreate" element={<User_profilecreate/>}/>
            <Route path="/user/profileupdate" element={<User_profileupdate/>}/>
            <Route path="/user/createlisting" element={<CreateListing/>}/>
            <Route path="/user/viewlisting" element={<ListingCard/>}/>
            <Route path="/user/mylisting" element={<Mylisting/>}/>
            <Route path="/user/swapselect" element={<Swapselecting/>}/>
            <Route path="/user/notifications" element={<NotificationsPage/>}/>
            <Route path="/user/clothdetails" element={<ClothDetails/>}/>
            <Route path="/user/chat/:swapId" element={<ChatPage/>}/>
            <Route path="/user/wishlist" element={<Wishlist/>}/>
            <Route path="/user/chatsection" element={<ChatSection/>}/>
            <Route path="/user/feedback" element={<FeedbackReportForm/>}/>
            <Route path="/user/userstarrating" element={<UserStarRating/>}/>
            <Route path="/user/reviewlisting" element={<Review_listing/>}/>
            <Route path="/user/viewuserprofile/:id" element={<User_Viewprofile/>}/>
            <Route path="/user/swaphistory" element={<SwapHistory/>}/>
            <Route path="/user/usernotification" element={<NotificationPage/>}/>

            
            
            </Route>
        </Routes>
    </div>
  )
}

export default Approuter