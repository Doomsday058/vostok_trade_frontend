//app/components/ProductCard
'use client';
import { useState } from 'react';
import BlueProductDetailModal from './ProductDetailModal';

type Product = {
  _id: string;
  title: string;
  description: string;
  image: string;
  price?: number;
  details?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="group bg-gray-900 rounded-lg border border-gray-800 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ease-out h-full flex flex-col hover:shadow-lg hover:shadow-blue-900/20">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
          <h3 className="absolute bottom-3 left-4 text-xl font-russo text-white z-10">{product.title}</h3>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-gray-300 mb-5 flex-1 font-montserrat">{product.description}</p>
          <button 
            onClick={() => setShowModal(true)}
            className="mt-auto w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300 text-white font-semibold font-montserrat"
          >
            Подробнее
          </button>
        </div>
      </div>

      <BlueProductDetailModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        product={product} 
      />
    </>
  );
}