import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminNav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/AdminLogin');
  };

  const handleLogin = () => {
    navigate('/admin/login');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">Admin Dashboard</div>
      
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default AdminNav;
