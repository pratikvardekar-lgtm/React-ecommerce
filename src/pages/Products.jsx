import React, { useEffect, useState } from "react";
import { getData } from "../context/DataContext";
import FilterSection from "../Components/FilterSection";
import ProductCard from "../Components/ProductCard";
import Pagination from "../Components/Pagination";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const { data, fetchAllProducts, loading } = getData();

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category") || "all";

  // Filters
  const [category, setCategory] = useState(categoryFromURL);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Filtered data
  const [filteredData, setFilteredData] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = data;

    if (category && category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    setFilteredData(filtered);
    setPage(1);
  }, [data, category, priceRange]);

  const pageHandler = (pageNumber) => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setPage(pageNumber);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-gray-50">

      {/* 🔥 Stylish Page Heading */}
      <div className=" text-black py-16 text-center shadow-lg mt-20 h-10">
        <h1 className="text-5xl font-bold mb-3">Our Products</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        {loading ? (
          <div className="text-center text-gray-600 py-20 text-xl">
            Loading products...
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">

            {/* Filter Sidebar */}
            <div className="md:w-64 w-full">
              <FilterSection
                category={category}
                setCategory={setCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                data={data}
              />
            </div>

            {/* Product List */}
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                page={page}
                totalPages={totalPages}
                pageHandler={pageHandler}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
