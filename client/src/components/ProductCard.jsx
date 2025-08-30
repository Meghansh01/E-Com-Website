import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showDescription, setShowDescription] = useState(false);

  const handleProductClick = () => {
    setShowDescription(true);
  };

  const closeDescription = () => {
    setShowDescription(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden flex flex-col max-w-xs mx-auto">
        <div className="h-48 w-full overflow-hidden cursor-pointer" onClick={handleProductClick}>
          <img src={product.image} alt={product.name} className="w-full h-full object-contain transform hover:scale-105 transition duration-300" />
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <div className="flex-1 cursor-pointer" onClick={handleProductClick}>
            <h3 className="text-lg font-semibold truncate dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{product.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">{product.category}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{product.description}</p>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <div className="text-xl font-bold dark:text-white mb-2">₹{product.price.toLocaleString()}</div>
            <div className="flex gap-4">
              <button className="flex-1 bg-teal-600 text-white py-2 rounded-full text-sm hover:bg-teal-700 transition-colors" onClick={()=>addToCart(product)}>Add to Cart</button>
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-full text-sm hover:bg-indigo-700 transition-colors" onClick={()=>{ addToCart(product); navigate('/checkout'); }}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Modal */}
      {showDescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeDescription}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold dark:text-white">{product.name}</h2>
                <button onClick={closeDescription} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl">
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold dark:text-white mb-2">Detailed Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.detailedDescription}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold dark:text-white mb-2">Specifications</h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {product.specifications.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold dark:text-white">₹{product.price.toLocaleString()}</div>
                <div className="flex gap-2">
                  <button className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors" onClick={()=>addToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors" onClick={()=>{ addToCart(product); navigate('/checkout'); closeDescription(); }}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
