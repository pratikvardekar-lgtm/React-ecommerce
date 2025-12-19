import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import { Link, useLocation } from "react-router-dom";

const Category = () => {
  const { data, fetchAllProducts } = getData();
  const location = useLocation();
  const currentCategory = new URLSearchParams(location.search).get("category");

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const categories = ["all", ...new Set(data.map(item => item.category))];

  return (
    <div className="bg-[#101829]">
      <div
        className="max-w-7xl mx-auto flex gap-3
        overflow-x-auto md:overflow-visible
        whitespace-nowrap md:flex-wrap
        justify-start md:justify-center
        py-4 px-4 scrollbar-hide mb-20">
        {categories.map((cat, index) => {
          const isActive = currentCategory === cat || (!currentCategory && cat === "all");

          return (
            <Link
              key={index}
              to={`/products?category=${cat}`}
              className={`uppercase px-5 py-2 rounded-full text-sm md:text-base
              flex-shrink-0 transition
              ${
                isActive
                  ? "bg-yellow-400 text-black font-semibold"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}>
              {cat}
            </Link>
          );
        })} 
      </div>
    </div>
  );
};

export default Category;
