import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { useCart } from './context/CartContext';

const Header = ({ searchTerm, setSearchTerm, darkMode, setDarkMode }) => {
  const { cartCount } = useCart();
  const [userEmail, setUserEmail] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  const handleSignout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className={`shadow sticky top-0 z-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container flex items-center gap-6 py-4 justify-between">
        <div className="flex items-center gap-6 flex-grow">
          <Link to="/" className={`text-4xl font-extrabold ${darkMode ? 'text-teal-400 drop-shadow-lg' : 'text-teal-600'}`}>
            Shopy
          </Link>
          <div className="relative flex-grow">
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className={`w-full rounded-full shadow-sm pl-4 pr-12 py-2 border ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'border-gray-200 text-gray-900 placeholder-gray-500'}`}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={darkMode ? "white" : "black"} strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart" className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9" />
            </svg>
            <span className="ml-1 bg-red-600 text-white rounded-full px-2 text-xs">{cartCount}</span>
          </Link>
          <Link to="/checkout" className="text-gray-700 dark:text-gray-300 hover:text-teal-500">Checkout</Link>
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={darkMode ? "white" : "black"} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
          </button>
          {userEmail ? (
            <button onClick={handleSignout} className="text-gray-700 dark:text-gray-300 hover:text-teal-500">Sign Out</button>
          ) : (
            <>
              <Link to="/signin" className="text-gray-700 dark:text-gray-300 hover:text-teal-500">Sign In</Link>
              <Link to="/signup" className="text-gray-700 dark:text-gray-300 hover:text-teal-500">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container min-h-screen p-4">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </main>
    </>
  );
}
