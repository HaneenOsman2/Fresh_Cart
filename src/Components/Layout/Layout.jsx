import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { UserContext } from '../Context/UserContext';
import { Offline, Online } from "react-detect-offline";


export default function Layout() {



  return <>
    <Navbar />
    <div className="container">

      <Outlet></Outlet>
    </div>

    <div>
    <Offline>
      <div className='off'>
        <i className='fas fa-wifi'></i>
        Only shown offline (surprise!)
      </div>
    </Offline>
  </div>
    <Footer />
  </>
}
