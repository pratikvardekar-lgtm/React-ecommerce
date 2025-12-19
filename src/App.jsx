import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Sign from "./pages/Sign";
import SingleProduct from "./pages/SingleProduct";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import OrderSuccess from "./Components/OrderSuccess";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} /> {/* ❤️ ADDED */}
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/sign" element={<Sign />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
