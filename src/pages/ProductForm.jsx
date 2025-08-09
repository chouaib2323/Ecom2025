import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState(['']);
  const [variants, setVariants] = useState([{ size: '', color: '', stock_quantity: 0, sku: '' }]);
  const [images, setImages] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/admin/adminGetCategory', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    if (token) fetchCategories();
  }, [token]);

  const handleAddVariant = () => {
    setVariants([...variants, { size: '', color: '', stock_quantity: 0, sku: '' }]);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleColorChange = (index, value) => {
    const updated = [...colors];
    updated[index] = value;
    setColors(updated);
  };

  const handleAddColor = () => {
    setColors([...colors, '']);
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const resetForm = () => {
    setName('');
    setDesc('');
    setPrice('');
    setCategoryId('');
    setColors(['']);
    setVariants([{ size: '', color: '', stock_quantity: 0, sku: '' }]);
    setImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', categoryId);
    formData.append('colors', JSON.stringify(colors));
    formData.append('variants', JSON.stringify(variants));
    images.forEach((img) => {
      formData.append('images', img);
    });

    try {
      const res = await axios.post('http://localhost:5000/admin/adminAddProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('✅ Product added successfully!');
      resetForm();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-900 text-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
        required
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full p-3 bg-gray-800 border border-gray-700 rounded"
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      {/* Colors */}
      <div>
        <label className="block mb-1 font-medium">Colors:</label>
        {colors.map((color, index) => (
          <input
            key={index}
            value={color}
            onChange={(e) => handleColorChange(index, e.target.value)}
            placeholder={`Color ${index + 1}`}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded mb-2"
          />
        ))}
        <button
          type="button"
          onClick={handleAddColor}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          + Add Color
        </button>
      </div>

      {/* Variants */}
      <div>
        <label className="block mb-1 font-medium">Variants:</label>
        {variants.map((variant, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 mb-2">
            <input
              type="text"
              placeholder="Size"
              value={variant.size}
              onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
              className="p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="text"
              placeholder="Color"
              value={variant.color}
              onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
              className="p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={variant.stock_quantity}
              onChange={(e) => handleVariantChange(index, 'stock_quantity', e.target.value)}
              className="p-2 bg-gray-800 border border-gray-700 rounded"
            />
            <input
              type="text"
              placeholder="SKU"
              value={variant.sku}
              onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
              className="p-2 bg-gray-800 border border-gray-700 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddVariant}
          className="text-blue-400 hover:text-blue-300 text-sm"
        >
          + Add Variant
        </button>
      </div>

      {/* Images */}
      <div>
        <label className="block mb-1 font-medium">Images:</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="block w-full text-white"
          accept="image/*"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold"
      >
        Submit Product
      </button>
    </form>
  );
}
