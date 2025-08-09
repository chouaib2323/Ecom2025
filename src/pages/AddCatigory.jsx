import React, { useState } from 'react';
import axios from 'axios';

function AddCategory() {
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState('');

  const onSubmit = async () => {
    if (!category.trim()) {
      alert('Please enter a category name.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/admin/adminAddCategory',
        { category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Category added successfully!');
      setCategory('');
    } catch (err) {
      console.error(err);
      alert('Failed to add category.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4">Add a Category</h2>

      <input
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        name="category"
        placeholder="Type a category"
        className="w-full p-2 bg-gray-700 text-white rounded mb-4"
      />

      <button
        onClick={onSubmit}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Add Category
      </button>
    </div>
  );
}

export default AddCategory;
