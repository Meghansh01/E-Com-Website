import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import productsData from '../products';

const Home = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);

  const categories = ['Electronics', 'Computers', 'Accessories', 'Sports', 'Clothes'];

  useEffect(()=>{
    axios.get('http://localhost:4001/api/products')
      .then(res=>setProducts(res.data))
      .catch(()=>setProducts(productsData));
  },[]);

  const filtered = products.filter(p=>p.name.toLowerCase().includes((searchTerm||'').toLowerCase()));

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 min-w-full">
      {/* Sidebar */}
      <aside className="hidden md:block w-48 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mr-6 sticky top-4 self-start h-fit">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">Categories</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {categories.map(cat => (
            <li key={cat} className="cursor-pointer hover:text-teal-600">{cat}</li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 max-w-full">
        {/* Search bar */}
        {/* Removed duplicate search bar */}
        {/* <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={() => {}} // No-op, controlled externally
          />
        </div> */}

        {/* Promotional banners */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 flex items-center gap-6">
            <div>
              <h1 className="text-4xl font-extrabold mb-2 dark:text-white">BIG SALE!</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">Wireless headphones with noise canceling</p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">Headphones</button>
            </div>
            <img src="/src/assets/products/sony-headphones.png" alt="Headphones" className="w-48 h-48 object-contain" />
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-pink-100 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4 text-center">
              <p className="text-lg dark:text-white"><span className="font-bold text-orange-500">Get up to 20% OFF</span> Headphones</p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4 text-center">
              <p className="font-semibold dark:text-white">Fujifilm Instax 11</p>
              <button className="bg-black text-white px-4 py-2 rounded-full mt-2 hover:bg-gray-800 transition-colors">Shop now</button>
            </div>
          </div>
        </div>

        {/* Products header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Products</h2>
          {/* Removed number of items display as per user request */}
          {/* <div className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} items</div> */}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
