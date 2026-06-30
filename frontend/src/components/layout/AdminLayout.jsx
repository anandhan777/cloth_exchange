import React from 'react'
import Adminnav from '../navbar/Adminnav'
import {Outlet} from 'react-router-dom'
import Sidebar from '../sidebar/Adminsidebar'

function AdminLayout() {
  return (
    <div>
        <div ><Sidebar/>
        <div ><Adminnav/></div>
        </div>
        <Outlet/>
    </div>
  )
}

export default AdminLayout