import React from 'react'
import Homenav from '../navbar/Homenav'
import {Outlet} from 'react-router-dom'

function HomeLayout() {
  return (
    <div>
        <Homenav/>
        <Outlet/>
    </div>
  )
}

export default HomeLayout