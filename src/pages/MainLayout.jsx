import React from 'react'
import Navbar from '../Componentes/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Componentes/Footer'
function MainLayout() {
  return (
   <>
   <Navbar/>
   <main className=''>
    <Outlet/>
   </main>
  <Footer/>
   </>
  )
}

export default MainLayout