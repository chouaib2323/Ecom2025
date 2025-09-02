import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart, clearCart } from "../store/cartSlice";
import axios from "axios";

const Checkout = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const token = localStorage.getItem("token");

  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/user/ordersRec",
        {
          cartItems: cartItems.map((item) => ({
            variantId: item.variants?.find(
              (v) =>
                v.color === item.selectedColor &&
                v.size === item.selectedSize
            )?.id || null, // find the right variant
            quantity: item.quantity,
            price: item.price,
          })),
          totalPrice,
          shippingAddress: token ? "Taken from user profile" : guestInfo.address,
          billingAddress: token ? "Taken from user profile" : guestInfo.address,
          paymentMethod: "cash_on_delivery",
          ...(token
            ? {}
            : {
                guest_name: guestInfo.name,
                guest_email: guestInfo.email,
                guest_phone: guestInfo.phone,
              }),
        },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      if (res.data.success) {
        alert("✅ Order placed successfully! Order ID: " + res.data.orderId);
        dispatch(clearCart());
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("❌ Failed to place order");
    }
  };

  if (cartItems.length === 0) {
    return <p className="text-center mt-10 text-xl">Your cart is empty 🛒</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div
            key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`}
            className="flex items-center justify-between border-b pb-4"
          >
            <img
              src={`http://localhost:5000/uploads/${item.images?.[0]}`}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1 ml-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.price} DA</p>
              {item.selectedColor && (
                <p className="text-sm text-gray-500">
                  Color: <span className="font-medium">{item.selectedColor}</span>
                </p>
              )}
              {item.selectedSize && (
                <p className="text-sm text-gray-500">
                  Size: <span className="font-medium">{item.selectedSize}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  dispatch(
                    decreaseQty({
                      id: item.id,
                      selectedColor: item.selectedColor,
                      selectedSize: item.selectedSize,
                    })
                  )
                }
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(
                    increaseQty({
                      id: item.id,
                      selectedColor: item.selectedColor,
                      selectedSize: item.selectedSize,
                    })
                  )
                }
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={() =>
                dispatch(
                  removeFromCart({
                    id: item.id,
                    selectedColor: item.selectedColor,
                    selectedSize: item.selectedSize,
                  })
                )
              }
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Guest Info Form if not logged in */}
      {!token && (
        <div className="mt-8 border p-6 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Guest Information</h3>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 mb-3 border rounded"
            value={guestInfo.name}
            onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
            value={guestInfo.email}
            onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            className="w-full p-2 mb-3 border rounded"
            value={guestInfo.phone}
            onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
          />
          <textarea
            placeholder="Address"
            className="w-full p-2 mb-3 border rounded"
            value={guestInfo.address}
            onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
          />
        </div>
      )}

      <div className="mt-8 flex justify-between items-center border-t pt-6">
        <h3 className="text-2xl font-bold">Total: {totalPrice} DA</h3>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCheckout}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
