import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="mt-32 flex flex-col items-center space-y-4">
      <h1 className="text-4xl font-bold text-green-600">✅ Order Successful!</h1>
      <p className="text-gray-600">Thank you for your purchase.</p>
      <Link
        to="/products"
        className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
