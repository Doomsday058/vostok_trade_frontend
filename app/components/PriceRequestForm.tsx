//app/components/PriceRequestForm.tsx
'use client';
import { useState } from 'react';
import { useUser } from './UserContext';
import BlueAuthModal from './AuthModal';

export default function PriceRequestForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await fetch('/api/request-price', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка запроса');
      }
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при отправке запроса');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section id="price-request" className="py-20 common-bg-section">
        <div className="max-w-5xl mx-auto px-4 text-white relative z-10">
          <h2 className="text-3xl font-russo mb-8 text-center">Получить оптовый прайс</h2>
          
          <div className="max-w-md mx-auto bg-gray-900/80 p-8 rounded-lg shadow-lg border border-gray-800">
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded text-white font-montserrat">
                {error}
              </div>
            )}
            
            {success ? (
              <div className="text-center py-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 mx-auto text-green-500 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-xl font-semibold mb-2 font-montserrat">Прайс-лист отправлен!</h3>
                <p className="text-gray-300 mb-6 font-montserrat">
                  Проверьте вашу электронную почту для получения актуального прайс-листа.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded transition-colors font-montserrat font-semibold"
                >
                  Запросить снова
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">                
                <div>
                  <label className="block mb-2 font-montserrat">Email для получения прайса</label>
                  <input 
                    type="email" 
                    value={user?.email || ''}
                    disabled
                    className="w-full bg-gray-800 rounded p-3 text-white border border-gray-700 font-montserrat"
                    placeholder={user ? '' : 'Требуется авторизация'}
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading || !user}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-white font-montserrat font-semibold disabled:opacity-70"
                >
                  {isLoading ? 'Отправка...' : user ? 'Получить прайс-лист' : 'Войдите, чтобы запросить прайс'}
                </button>
                
                {!user && (
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(true)}
                    className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded transition-colors text-white font-montserrat"
                  >
                    Вход / Регистрация
                  </button>
                )}
                
                <p className="text-sm text-gray-400 text-center mt-4 font-montserrat">
                  Прайс-лист будет отправлен на указанный email в формате Excel
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      
      <BlueAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}