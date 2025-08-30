import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = ()=> {
  const { cartItems, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cartItems.reduce((a,b)=> a + b.price * (b.quantity||1), 0);

  if (!cartItems.length) return <div className="text-center py-12 text-gray-500">Your cart is empty. <Link to="/" className="text-teal-600">Shop now</Link></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map(item=>(
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-28 h-20 object-cover rounded-md" />
              <div>
                <div className="font-semibold dark:text-white">{item.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300">₹{item.price.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border dark:border-gray-600 rounded-md overflow-hidden">
                <button className="px-3 py-2 dark:text-white dark:hover:bg-gray-700" onClick={()=> updateQty(item.id, Math.max(1, (item.quantity||1)-1))}>-</button>
                <div className="px-4 dark:text-white">{item.quantity||1}</div>
                <button className="px-3 py-2 dark:text-white dark:hover:bg-gray-700" onClick={()=> updateQty(item.id, (item.quantity||1)+1)}>+</button>
              </div>
              <div className="font-semibold dark:text-white">₹{((item.price)*(item.quantity||1)).toLocaleString()}</div>
              <button className="text-sm text-red-500 dark:text-red-400" onClick={()=> removeItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <div className="text-sm text-gray-500 dark:text-gray-300">Order Summary</div>
          <div className="text-lg font-bold mt-2 dark:text-white">Total: ₹{total.toLocaleString()}</div>
          <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">Items: {cartItems.length}</div>
          <button className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors" onClick={()=> navigate('/checkout')}>Proceed to Checkout</button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 text-sm text-gray-500 dark:text-gray-300">
          Tip: You can increase quantities or remove items before checkout.
        </div>
      </div>
    </div>
  );
};

export default CartPage;
