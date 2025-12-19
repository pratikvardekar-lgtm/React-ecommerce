import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setData(res.data);
      setFilteredData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // FILTER LOGIC
  useEffect(() => {
    let products = [...data];

    if (category !== "all") {
      products = products.filter((prod) => prod.category === category);
    }

    products = products.filter(
      (prod) => prod.price >= priceRange[0] && prod.price <= priceRange[1]
    );

    setFilteredData(products);
  }, [category, priceRange, data]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        filteredData,
        loading,
        category,
        setCategory,
        priceRange,
        setPriceRange,
        fetchAllProducts, // ✅ FIXED (now exported)
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
