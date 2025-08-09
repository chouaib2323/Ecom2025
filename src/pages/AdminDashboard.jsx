import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>
        <Link to='/ProductForm'>Add product</Link>
        <Link to='/AddCatigory'>add product category </Link>
    </div>
  )
}

export default AdminDashboard