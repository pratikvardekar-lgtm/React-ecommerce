import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // ---------------- Delivery State ----------------
  const [delivery, setDelivery] = useState({
    name: "",
    address: "",
    state: "",
    postcode: "",
    country: "",
    phone: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("deliveryInfo");
    if (saved) {
      setDelivery(JSON.parse(saved));
      setIsSubmitted(true);
    }
  }, []);

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle Input
  const handleChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  // Submit Delivery
  const handleDeliverySubmit = () => {
    const { name, address, state, postcode, country, phone } = delivery;

    if (!name || !address || !state || !postcode || !country || !phone) {
      toast.error("Please fill all delivery details!");
      return;
    }

    localStorage.setItem("deliveryInfo", JSON.stringify(delivery));
    setIsSubmitted(true);
    toast.success("Delivery details saved!");
  };

  // Checkout
  const handleCheckout = () => {
    if (!isSubmitted) {
      toast.error("Please fill delivery details first!");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    toast.success("🎉 Order placed successfully!");

    clearCart();
    localStorage.removeItem("deliveryInfo");

    setTimeout(() => {
      navigate("/order-success");
    }, 1500);
  };

  return (
    <div className="mt-24 max-w-6xl mx-auto mb-10 px-4">
      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-600 py-20">
          🛒 Your cart is empty
        </div>
      ) : (
        <>
          <h1 className="font-bold text-3xl mb-5">
            My Cart ({cartItems.length})
          </h1>

          {/* Cart Items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain bg-white p-2"
                  />
                  <div>
                    <h1 className="font-medium line-clamp-2">
                      {item.title}
                    </h1>
                    <p className="text-red-500 font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => decreaseQty(item.id)} className="p-2 bg-gray-300 rounded-full">
                    <FiMinus />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className="p-2 bg-gray-300 rounded-full">
                    <FiPlus />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ))}
          </div>

          {/* Delivery + Bill */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

            {/* Delivery */}
            <div className="bg-gray-100 rounded-md p-7 space-y-4">
              <h1 className="font-bold text-xl">Delivery Info</h1>

              <input name="name" value={delivery.name} onChange={handleChange} placeholder="Full Name" className="input" />
              <input name="address" value={delivery.address} onChange={handleChange} placeholder="Address" className="input" />

              <div className="flex gap-4">
                <input name="state" value={delivery.state} onChange={handleChange} placeholder="State" className="input" />
                <input name="postcode" value={delivery.postcode} onChange={handleChange} placeholder="Postcode" className="input" />
              </div>

              <div className="flex gap-4">
                <input name="country" value={delivery.country} onChange={handleChange} placeholder="Country" className="input" />
                <input name="phone" value={delivery.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
              </div>

              <button
                onClick={handleDeliverySubmit}
                className="bg-red-500 text-white py-2 rounded-md w-full font-semibold"
              >
                Save Delivery Info
              </button>
            </div>

            {/* Bill */}
            <div className="bg-white border shadow-xl rounded-md p-7 space-y-3">
              <h1 className="font-bold text-xl">Bill Details</h1>

              <div className="flex justify-between">
                <span className="flex gap-1"><LuNotebookText /> Items Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span className="flex gap-1"><GiShoppingBag /> Handling</span>
                <span>₹5</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold text-lg">
                <span>Grand Total</span>
                <span>₹{totalPrice + 5}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 bg-red-500 text-white py-2 rounded-md w-full font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
