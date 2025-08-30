import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const CheckoutPage = ()=> {
  const { cartItems, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const total = cartItems.reduce((a,b)=> a + b.price * (b.quantity||1), 0);

  const handleCheckout = async ()=> {
    try {
      const res = await axios.post('http://localhost:4000/api/checkout/demo-session', { name: name||'Guest', email: email||'guest@example.com' });
      clearCart();
      toast.success('Order placed successfully ✅ (id: ' + res.data.order.id + ')', {duration:4000});
    } catch (err) {
      toast.error('Checkout failed');
    }
  };

  if (!cartItems.length) return <div className="text-center py-12 text-gray-500">Your cart is empty.</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map(item=>(
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-28 h-20 object-cover rounded-md" />
              <div>
                <div className="font-semibold dark:text-white">{item.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-300">Qty: {item.quantity||1}</div>
              </div>
            </div>
            <div className="font-semibold dark:text-white">₹{((item.price)*(item.quantity||1)).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 space-y-3">
          <div className="text-lg font-semibold dark:text-white">Checkout</div>
          <div className="text-sm text-gray-500 dark:text-gray-300">Total: ₹{total.toLocaleString()}</div>
          <input className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input className="w-full border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors" onClick={handleCheckout}>Place Order</button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 text-sm text-gray-500 dark:text-gray-300">Secure checkout (demo)</div>
      </div>
    </div>
  );
};

export default CheckoutPage;
