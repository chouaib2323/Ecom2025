import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className=' space-x-10 font-bold'>
        <Link to='/ProductForm'>Add product</Link>
        <Link to='/AddCatigory'>Add a product category </Link>
        <Link to='/DeleteProduct'>Delete a product</Link>
    </div>
  )
}

export default AdminDashboard