import React from 'react'
import AdminNav from '../Componentes/AdminNav'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
   <>
   <AdminNav/>
   <main className=''>
    <Outlet/>
   </main>
  
   </>
  )
}

export default AdminLayout