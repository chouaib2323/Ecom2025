import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [availability, setAvailability] = useState(null); // "available" | "out" | null
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get('http://localhost:5000/user/getproducts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(result.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [token]);

  // --- Filtering Logic ---
  const filteredProducts = products.filter((product) => {
    // Search
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Availability
    let isAvailable = true;
    if (product.variants && product.variants.length > 0) {
      isAvailable = product.variants.some((v) => parseInt(v.stock_quantity) > 0);
    }
    if (availability === 'available' && !isAvailable) return false;
    if (availability === 'out' && isAvailable) return false;

    // Size filter (check in product.variants)
    if (selectedSize) {
      const hasSize =
        product.variants &&
        product.variants.some((v) => v.size && v.size.toUpperCase() === selectedSize.toUpperCase());
      if (!hasSize) return false;
    }

    // Category filter
    if (selectedCategory && product.category_id !== selectedCategory) return false;

    // Colors filter
    if (selectedColor) {
      const hasColor =
        product.colors &&
        product.colors.some((c) => c.toLowerCase() === selectedColor.toLowerCase());
      if (!hasColor) return false;
    }

    return matchesSearch;
  });

  return (
    <div className="flex flex-col lg:flex-row px-6 lg:px-20 py-8 gap-10 bg-gray-100">
      {/* Sidebar Filters */}
      <aside className="lg:w-1/4 w-full md:pt-24">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        {/* Size */}
        <div className="mb-6 border-b-2 border-dotted border-gray-300 py-6">
          <h3 className="font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {['XS', 'S', 'M', 'L', 'XL', '2X'].map((size) => (
              <button
                key={size}
                className={`border px-3 py-1 rounded ${
                  selectedSize === size ? 'bg-black text-white' : ''
                }`}
                onClick={() => setSelectedSize(selectedSize === size ? null : size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Availability</h3>
          <div className="flex flex-col gap-1">
            <label>
              <input
                type="checkbox"
                className="mr-2"
                checked={availability === 'available'}
                onChange={() =>
                  setAvailability(availability === 'available' ? null : 'available')
                }
              />
              Available
            </label>
            <label>
              <input
                type="checkbox"
                className="mr-2"
                checked={availability === 'out'}
                onChange={() => setAvailability(availability === 'out' ? null : 'out')}
              />
              Out of Stock
            </label>
          </div>
        </div>

        {/* Category */}
        <div className="mb-6 border-y-2 border-dotted border-gray-300 py-2">
          <h3 className="font-medium">Category</h3>
          <div className="flex flex-col gap-1 mt-2">
            {[1, 2, 3].map((cat) => (
              <button
                key={cat}
                className={`border px-3 py-1 rounded ${
                  selectedCategory === cat ? 'bg-black text-white' : ''
                }`}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              >
                Category {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6 border-b-2 border-dotted border-gray-300 py-2">
          <h3 className="font-medium">Colors</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {['black', 'blue', 'red', 'EEEE'].map((color) => (
              <button
                key={color}
                className={`border px-3 py-1 rounded ${
                  selectedColor === color ? 'bg-black text-white' : ''
                }`}
                onClick={() => setSelectedColor(selectedColor === color ? null : color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="flex-1">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">PRODUCTS</h2>
          <div className="flex items-center mt-4 lg:mt-0">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-l px-4 py-2 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-black text-white px-4 rounded-r">Search</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            let isAvailable = true;
            if (product.variants && product.variants.length > 0) {
              isAvailable = product.variants.some((v) => parseInt(v.stock_quantity) > 0);
            }

            return (
              <div key={product.id} className="">
                <div className="bg-white h-full rounded-lg overflow-hidden w-full shadow-md md:h-72 grid place-items-center relative">
                  <img
                    src={`http://localhost:5000/uploads/${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!isAvailable && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Out of Stock
                    </span>
                  )}
                </div>
                <h1 className="text-gray-700 text-xs text-left py-1 font-semibold">
                  {product.name}
                </h1>
                <div className="flex justify-between text-black font-semibold">
                  <h1>{product.description}</h1>
                  <h1>{product.price} DA</h1>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Products;
