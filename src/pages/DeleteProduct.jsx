import axios from 'axios';
import React, { useEffect, useState } from 'react';

function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const token = localStorage.getItem('token')
  
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/getproducts"); 
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Delete a product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/admin/adminDeleteProduct/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" ,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
        
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        // Remove product from state so UI updates
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Delete Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center p-3 border rounded-lg shadow"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">${product.price}</p>
              </div>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DeleteProduct;
