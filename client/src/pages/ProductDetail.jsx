import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import productsData from '../products';

const ProductDetail = ()=> {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:4000/api/products/' + id)
      .then(res=>setProduct(res.data))
      .catch(()=> {
        const p = productsData.find(x=>x.id===parseInt(id));
        setProduct(p);
      });
  },[id]);

  if (!product) return <div className="text-center py-12 text-gray-500 dark:text-gray-400">Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg">
      <div className="rounded-2xl overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2 dark:text-white">{product.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
          {product.specifications.map((s,i)=><li key={i}>{s}</li>)}
        </ul>
        <div className="text-2xl font-bold mb-4 dark:text-white">₹{product.price.toLocaleString()}</div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg" onClick={()=>addToCart(product)}>Add to Cart</button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg" onClick={()=>{ addToCart(product); navigate('/checkout'); }}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
