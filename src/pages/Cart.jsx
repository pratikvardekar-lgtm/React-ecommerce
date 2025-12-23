import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();
  const navigate = useNavigate();

  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    address: "",
    state: "",
    postcode: "",
    country: "",
    phoneNumber: "",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    const savedDeliveryInfo = localStorage.getItem("deliveryInfo");
    const savedFormStatus = localStorage.getItem("isFormSubmitted");

    if (savedDeliveryInfo) setDeliveryInfo(JSON.parse(savedDeliveryInfo));
    if (savedFormStatus) setIsFormSubmitted(JSON.parse(savedFormStatus));
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("deliveryInfo", JSON.stringify(deliveryInfo));
    localStorage.setItem("isFormSubmitted", JSON.stringify(true));
    setIsFormSubmitted(true);
    toast.success("Delivery information saved!");
  };

  const handleEditDelivery = () => {
    setIsFormSubmitted(false);
    localStorage.setItem("isFormSubmitted", JSON.stringify(false));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const order = {
      orderId: `ORD-${Date.now()}`,
      items: cartItems,
      deliveryInfo,
      totalAmount: totalPrice + 5,
      orderDate: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    toast.success("Order placed successfully!");
    clearCart();

    setTimeout(() => navigate("/order-success"), 1000);
  };

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4">
      {cartItems.length === 0 ? (
        <div className="text-center py-28">
          <div className="text-6xl mb-6 animate-bounce">🛒</div>
          <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3 space-y-6">
            {/* Cart Items */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Items ({cartItems.length})</h2>
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-4 gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain bg-gray-100 p-2 rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm">₹{item.price} × {item.quantity}</p>
                      <p className="font-semibold text-lg">₹{item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <FiMinus />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
                      >
                        <FiPlus />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700 transition"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Form */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Delivery Information</h2>
                {isFormSubmitted && (
                  <button onClick={handleEditDelivery} className="text-blue-500 text-sm hover:underline">
                    Edit
                  </button>
                )}
              </div>

              {isFormSubmitted ? (
                <div className="space-y-2 text-gray-700">
                  <p><strong>Name:</strong> {deliveryInfo.fullName}</p>
                  <p><strong>Address:</strong> {deliveryInfo.address}, {deliveryInfo.state}, {deliveryInfo.postcode}, {deliveryInfo.country}</p>
                  <p><strong>Phone:</strong> {deliveryInfo.phoneNumber}</p>
                </div>
              ) : (
                <form onSubmit={handleDeliverySubmit} className="space-y-3">
                  <input
                    type="text"
                    name="fullName"
                    value={deliveryInfo.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                  />
                  <input
                    type="text"
                    name="address"
                    value={deliveryInfo.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="state"
                      value={deliveryInfo.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                    <input
                      type="text"
                      name="postcode"
                      value={deliveryInfo.postcode}
                      onChange={handleInputChange}
                      placeholder="Postcode"
                      className="p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="country"
                      value={deliveryInfo.country}
                      onChange={handleInputChange}
                      placeholder="Country"
                      className="p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                    <input
                      type="text"
                      name="phoneNumber"
                      value={deliveryInfo.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    Save Delivery Info
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white shadow-lg rounded-xl p-6 sticky top-28">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Items ({cartItems.length})</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Handling Charge</span>
                  <span>₹5.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(totalPrice + 5).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={!isFormSubmitted}
                className={`w-full py-3 rounded-lg font-semibold mb-3 transition ${
                  isFormSubmitted 
                    ? "bg-black text-white hover:bg-gray-800" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isFormSubmitted ? "Place Order" : "Complete Delivery Form"}
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full py-2 border rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
