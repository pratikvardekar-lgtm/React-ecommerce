import React from "react";
import { useCart } from "../context/CartContext";
import { IoCartOutline } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";

const Wishlist = () => {
  const { wishlistItems, addToCart, toggleWishlist } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl font-semibold">
        ❤️ Your wishlist is empty
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition"
          >
            {/* Remove Wishlist */}
            <button
              onClick={() => toggleWishlist(item)}
              className="text-red-500 text-xl float-right"
              title="Remove from wishlist"
            >
              <AiFillHeart />
            </button>

            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="h-40 mx-auto object-contain"
            />

            {/* Title */}
            <h2 className="mt-4 font-semibold line-clamp-2">
              {item.title}
            </h2>

            {/* Price */}
            <p className="mt-2 text-lg font-bold">
              ₹ {item.price}
            </p>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(item)}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg
              flex items-center justify-center gap-2 hover:bg-purple-700"
            >
              <IoCartOutline className="text-xl" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
