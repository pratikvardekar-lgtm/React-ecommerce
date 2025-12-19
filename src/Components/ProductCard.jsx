import React from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart, wishlistItems, toggleWishlist } = useCart() // ✅ wishlist included

  // Check if product is already in wishlist
  const isWishlisted = wishlistItems.some(item => item.id === product.id)

  return (
    <div className="border border-gray-200 rounded-2xl bg-white cursor-pointer
      hover:shadow-xl hover:scale-[1.03] transition-all duration-300 
      p-4 flex flex-col relative">

      {/* Wishlist Button (Top Right) */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 text-xl z-10"
      >
        {isWishlisted ? (
          <AiFillHeart className="text-red-500 w-6 h-6" />
        ) : (
          <AiOutlineHeart className="text-gray-400 w-6 h-6" />
        )}
      </button>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        <img
          onClick={() => navigate(`/products/${product.id}`)}
          src={product.image}
          alt={product.title}
          className="w-4/5 h-4/5 object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="line-clamp-2 font-semibold text-gray-900 mt-3 text-sm md:text-base">
        {product.title}
      </h1>

      {/* Price */}
      <p className="text-lg md:text-xl text-gray-800 font-bold mt-2">
        ₹ {product.price}
      </p>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="bg-red-500 mt-4 px-4 py-2 text-sm md:text-lg rounded-lg text-white
        w-full flex gap-2 items-center justify-center font-semibold hover:bg-red-600">

        <IoCartOutline className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard