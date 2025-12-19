import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline, IoMenu, IoClose, IoSearch } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai"; 
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems, wishlistItems } = useCart();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/products?search=${search}`); // ✅ Redirect to Products
    setSearch("");
    setShowSearch(false);
    setMenuOpen(false);
  };

  return (
    <header className="w-full bg-gradient-to-r from-pink-700 via-purple-500 to-indigo-600 fixed top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h2 className="text-3xl font-bold text-white">
          S<span className="text-yellow-300">hop</span>
        </h2>

        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-10 text-white text-lg font-medium">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="px-3 py-2 rounded-md w-56 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-white px-4 py-2 rounded-md font-semibold"
            >
              Search
            </button>
          </div>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setShowSearch(!showSearch)}
          >
            <IoSearch />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative">
            <AiOutlineHeart className="h-8 w-8 text-white" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white px-2 rounded-full text-sm">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <IoCartOutline className="h-8 w-8 text-white" />
            <span className="absolute -top-2 -right-3 bg-red-600 text-white px-2 rounded-full text-sm">
              {cartItems.length}
            </span>
          </Link>

          <Link to="/sign" className="hidden md:block">
            <button className="bg-white px-5 py-2 rounded-lg text-purple-700 font-semibold">
              Sign
            </button>
          </Link>

          <button
            className="md:hidden text-white text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden bg-indigo-600 px-4 pb-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-3 py-2 rounded-md outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-white px-4 py-2 rounded-md text-purple-700 font-semibold"
            >
              Go
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-indigo-600 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 py-6" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-end gap-6 text-white text-lg">
          <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about">About</Link>
          <Link onClick={() => setMenuOpen(false)} to="/products">Products</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>
          <Link onClick={() => setMenuOpen(false)} to="/sign">
            <button className="bg-white text-purple-700 px-8 py-2 rounded-lg font-semibold">
              Sign
            </button>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;