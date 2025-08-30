import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(()=>{
    const saved = localStorage.getItem('cart_items_v2');
    if (saved) setCartItems(JSON.parse(saved));
  },[]);

  useEffect(()=>{
    localStorage.setItem('cart_items_v2', JSON.stringify(cartItems));
  },[cartItems]);

  const cartCount = cartItems.reduce((a,b)=>a + (b.quantity||1),0);

  const addToCart = (product, qty=1) => {
    setCartItems(prev=>{
      const existing = prev.find(p=>p.id===product.id);
      if (existing) return prev.map(p=>p.id===product.id?{...p, quantity:(p.quantity||1)+qty}:p);
      return [...prev, {...product, quantity: qty}];
    });
    toast.success(product.name + ' added to cart', {duration:2500});
  };

  const updateQty = (productId, qty) => {
    setCartItems(prev=> prev.map(p=> p.id===productId?{...p, quantity: qty}:p));
  };

  const removeItem = (productId) => {
    setCartItems(prev=> prev.filter(p=>p.id!==productId));
    toast('Item removed', {icon: '🗑️'});
  };

  const clearCart = ()=> { setCartItems([]); toast.success('Cart cleared'); };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeItem, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = ()=> useContext(CartContext);
