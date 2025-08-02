//app/components/ProductDetailModal
'use client';
import { useState } from 'react';
import { useUser } from './UserContext';
import BlueAuthModal from './AuthModal';
import Modal from './Modal';

type Product = {
  _id: string;
  title: string;
  description: string;
  image: string;
  price?: number;
  details?: string;
};

type ProductDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
};

export default function ProductDetailModal({ isOpen, onClose, product }: ProductDetailModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useUser();

  const handleRequestPrice = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    setSuccess(false);
    
    try {
      const response = await fetch('/api/request-price', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Request failed');
      setSuccess(true);
    } catch (error) {
      console.error('Error requesting price:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={product.title}>
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-60 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
          </div>
          
          <div>
            <h3 className="text-xl font-russo mb-3 text-white">{product.title}</h3>
            <p className="text-gray-300 mb-5 font-montserrat">{product.description}</p>
            
            {product.details && (
              <div className="mt-5 bg-gray-800/40 p-4 rounded-lg border border-gray-800">
                <h4 className="text-lg font-semibold mb-2 text-white font-montserrat">Детали</h4>
                <p className="text-gray-300 font-montserrat">{product.details}</p>
              </div>
            )}
          </div>
          
          {success ? (
            <div className="bg-green-900/30 border border-green-800 text-white p-5 rounded-lg">
              <p className="font-semibold font-montserrat">Прайс-лист отправлен на вашу почту!</p>
              <p className="mt-2 text-sm font-montserrat">Проверьте ваш почтовый ящик.</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 mt-4">
              <p className="text-white font-montserrat">
                {user ? 
                  'Запросите актуальный прайс-лист с оптовыми ценами:' : 
                  'Войдите или зарегистрируйтесь, чтобы запросить прайс-лист:'
                }
              </p>
              
              <button
                onClick={handleRequestPrice}
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300 text-white font-semibold font-montserrat disabled:opacity-70"
              >
                {isLoading ? 'Отправка...' : 'Получить прайс-лист'}
              </button>
              
              {!user && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors duration-300 text-white font-semibold font-montserrat"
                >
                  Вход / Регистрация
                </button>
              )}
            </div>
          )}
        </div>
      </Modal>
      
      <BlueAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}