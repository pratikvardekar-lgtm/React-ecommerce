import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center text-2xl py-20">Loading...</div>;
  }

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-500 text-2xl">
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-6 mt-28">
      <div className="flex flex-col md:flex-row gap-12 items-start">

        {/* Image */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 rounded-xl flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-3/4 object-contain"
          />
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2">
          <p className="text-2xl bg-gray-200 text-gray-700 inline-block px-4 py-1 rounded-full mb-3 font-bold">
            {product.category.toUpperCase()}
          </p>

          <h1 className="text-4xl font-bold mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            {renderStars(product.rating.rate)}
            <span>{product.rating.rate}/5</span>
          </div>

          <p className="text-3xl font-semibold text-red-600 mb-6">
            ₹ {product.price}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <h1 className="font-bold">Quantity</h1>
            <button
              onClick={() => setQuantity(qty => Math.max(1, qty - 1))}
              className="p-2 bg-gray-300 rounded-full"
            >
              <FiMinus />
            </button>

            <span className="text-xl font-semibold">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(qty => qty + 1)}
              className="p-2 bg-gray-300 rounded-full"
            >
              <FiPlus />
            </button>
          </div>
          
          <p className="text-gray-700 mb-6">
            {product.description}
          </p>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(product, quantity)}
            className="bg-green-600 flex items-center gap-2 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700"
          >
            <IoCartOutline className="w-6 h-6" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
