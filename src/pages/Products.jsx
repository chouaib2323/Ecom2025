import React from 'react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Basic Slim Fit T-Shirt",
      type: "Cotton T Shirt",
      price: 199,
      image: "https://via.placeholder.com/300x400?text=Model+1"
    },
    {
      id: 2,
      name: "Basic Heavy Weight T-Shirt",
      type: "Crewneck T Shirt",
      price: 199,
      image: "https://via.placeholder.com/300x400?text=Model+2"
    },
    {
      id: 3,
      name: "Full Sleeve Zipper",
      type: "Cotton T Shirt",
      price: 199,
      image: "https://via.placeholder.com/300x400?text=Model+3"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row px-6 lg:px-20 py-8 gap-10 bg-gray-100">
      {/* Sidebar Filters */}
      <aside className="lg:w-1/4 w-full  md:pt-24">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>

        <div className="mb-6 border-b-2 border-dotted border-gray-300  py-6">
          <h3 className="font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {['XS', 'S', 'M', 'L', 'XL', '2X'].map(size => (
              <button key={size} className="border px-3 py-1 rounded hover:bg-black hover:text-white transition">
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 ">
          <h3 className="font-medium mb-2">Availability</h3>
          <div className="flex flex-col gap-1">
            <label><input type="checkbox" className="mr-2" />Availability (450)</label>
            <label><input type="checkbox" className="mr-2" />Out of Stock (18)</label>
          </div>
        </div>

        {/* More filters can be added here similarly */}
        <div className="">
          <h3 className="font-medium  border-y-2 border-dotted border-gray-300  py-2">Category</h3>
          <h3 className="font-medium  border-b-2 border-dotted border-gray-300  py-2">Colors</h3>
          <h3 className="font-medium  border-b-2 border-dotted border-gray-300  py-2">Price Range</h3>
          <h3 className="font-medium  border-b-2 border-dotted border-gray-300  py-2">Collections</h3>
          <h3 className="font-medium  border-b-2 border-dotted border-gray-300  py-2">Tags</h3>
          <h3 className="font-medium  border-b-2 border-dotted border-gray-300  py-2">Ratings</h3>
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
            />
            <button className="bg-black text-white px-4 rounded-r">Search</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['NEW', 'SHIRTS', 'POLO SHIRTS', 'SHORTS', 'T-SHIRTS', 'JEANS', 'JACKETS', 'COATS'].map(filter => (
            <button key={filter} className="border px-3 py-1 rounded hover:bg-black hover:text-white transition">
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="text-center">
              <img src={product.image} alt={product.name} className="mx-auto mb-4 rounded shadow" />
              <p className="text-sm text-gray-500">{product.type}</p>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="font-bold mt-1">${product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
