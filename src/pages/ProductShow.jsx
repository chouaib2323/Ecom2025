import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductShow = () => {
  const { id } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [product, setProduct] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/user/getproduct/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const handleAddToCart = () => {
    if (product.colors?.length > 0 && !selectedColor) {
      alert("Please select a color.");
      return;
    }
    if (product.variants?.length > 0 && !selectedSize) {
      alert("Please select a size.");
      return;
    }

    dispatch(
      addToCart({
        ...product,
        selectedColor,
        selectedSize,
        quantity: 1,
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Gallery */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          className="w-24 h-[400px] rounded-lg overflow-hidden"
        >
          {product.images?.map((img, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <img
                src={`http://localhost:5000/uploads/${img}`}
                alt={`Thumbnail ${index}`}
                className="w-full h-24 object-cover rounded-lg border hover:border-black"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Main Swiper */}
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="flex-1 rounded-lg overflow-hidden"
        >
          {product.images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={`http://localhost:5000/uploads/${img}`}
                alt={`Product ${index}`}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Info */}
      <div>
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-2xl text-gray-700 mt-2">{product.price} DA</p>
        <p className="mt-4 text-gray-600">{product.description}</p>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Colors:</h3>
            <div className="flex gap-3">
              {product.colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg 
                    ${
                      selectedColor === color
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.variants?.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Sizes:</h3>
            <div className="flex gap-3">
              {product.variants.map((variant, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(variant.size)}
                  className={`px-4 py-2 border rounded-lg 
                    ${
                      selectedSize === variant.size
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {variant.size || "N/A"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-8 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductShow;
