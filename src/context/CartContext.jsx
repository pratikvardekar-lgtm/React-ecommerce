import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]); // ❤️ WISHLIST STATE

  // ✅ ADD TO CART WITH QUANTITY
  const addToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        toast.info("Quantity updated in cart", {
          toastId: `update-${product.id}`,
        });

        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      toast.success("Product added to cart", {
        toastId: `add-${product.id}`,
      });

      return [...prevItems, { ...product, quantity: qty }];
    });
  };

  // ✅ INCREASE QTY
  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ DECREASE QTY
  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ REMOVE FROM CART
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );

    toast.error("Product removed from cart", {
      toastId: `remove-${id}`,
    });
  };

  // ===================== WISHLIST =====================

  // ❤️ ADD / REMOVE WISHLIST
  const toggleWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.find(
        (item) => item.id === product.id
      );

      if (exists) {
        toast.error("Removed from wishlist", {
          toastId: `wishlist-remove-${product.id}`,
        });

        return prevItems.filter(
          (item) => item.id !== product.id
        );
      }

      toast.success("Added to wishlist", {
        toastId: `wishlist-add-${product.id}`,
      });

      return [...prevItems, product];
    });
  };

  return (
    <CartContext.Provider
      value={{
        // cart
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,

        // wishlist
        wishlistItems,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ SAFE HOOK
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
