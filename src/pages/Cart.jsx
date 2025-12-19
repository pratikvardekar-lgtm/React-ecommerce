import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const Cart = () => {
  const {cartItems, removeFromCart, increaseQty, decreaseQty,
  } = useCart();

  // ✅ Total Price with quantity
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

    // ✅ Checkout Handler
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Show success message
    toast.success("🎉 Order placed successfully!");

    // Clear cart
    clearCart();

    // Redirect to order success page
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
        <div>
          <h1 className="font-bold text-3xl mb-5">
            My Cart ({cartItems.length})
          </h1>

          {/* Cart Items */}
          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between p-4 shadow-sm gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-md object-contain bg-white p-2"
                  />

                  <div>
                    <h1 className="w-[260px] md:w-[350px] line-clamp-2 font-medium">
                      {item.title}
                    </h1>

                    <p className="text-red-500 font-semibold text-lg mt-1">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
                  >
                    <FiMinus />
                  </button>

                  <span className="font-semibold text-lg">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
                >
                  <FaRegTrashAlt />
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Delivery + Bill */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-7 space-y-4">
              <h1 className="text-gray-800 font-bold text-xl">
                Delivery Info
              </h1>

              <input className="p-2 rounded-md w-full font-bold" placeholder="Full Name" />
              <input className="p-2 rounded-md w-full font-bold" placeholder="Address" />

              <div className="flex gap-5">
                <input className="p-2 rounded-md w-full font-bold" placeholder="State" />
                <input className="p-2 rounded-md w-full font-bold" placeholder="Postcode" />
              </div>

              <div className="flex gap-5">
                <input className="p-2 rounded-md w-full font-bold" placeholder="Country" />
                <input className="p-2 rounded-md w-full font-bold" placeholder="Phone Number" />
              </div>

              <button className="bg-red-500 text-white py-2 rounded-md w-full font-semibold">
                Submit
              </button>
            </div>

            {/* Bill Details */}
            <div className="bg-white border shadow-xl rounded-md p-7 h-max space-y-3">
              <h1 className="text-gray-800 font-bold text-xl">
                Bill Details
              </h1>

              <div className="flex justify-between">
                <span className="flex items-center gap-1 text-gray-700">
                  <LuNotebookText /> Items Total
                </span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-1 text-gray-700">
                  <GiShoppingBag /> Handling Charge
                </span>
                <span className="text-red-500 font-semibold">₹5</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold text-lg">
                <span>Grand Total</span>
                <span>₹{totalPrice + 5}</span>
              </div>

            <button
              onClick={handleCheckout}
              className="mt-6 bg-red-500 text-white py-2 rounded-md w-full font-semibold hover:bg-red-600"
            >
              Proceed to Checkout
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
