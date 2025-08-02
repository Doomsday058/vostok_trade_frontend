// app/account/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../components/UserContext';
import { FaUserCircle, FaEnvelope, FaBuilding, FaHistory, FaSpinner } from 'react-icons/fa';

type PriceRequest = {
  _id: string;
  requestDate: string;
  status: string;
};

export default function AccountPage() {
  const { user, logout } = useUser();
  const router = useRouter();
  const [priceRequests, setPriceRequests] = useState<PriceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Если пользователь не авторизован, перенаправляем на главную
    if (!user) {
      router.push('/');
      return;
    }

    // Загружаем историю запросов прайс-листов
    const fetchPriceRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Не найден токен авторизации');
        }
        
        const response = await fetch('/api/price-requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке истории запросов');
        }
        
        const data = await response.json();
        setPriceRequests(data);
      } catch (err) {
        console.error('Error fetching price requests:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPriceRequests();
  }, [user, router]);
  
  if (!user) return null;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'sent': return 'Отправлен';
      case 'pending': return 'В обработке';
      case 'failed': return 'Ошибка';
      default: return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-900 text-green-300';
      case 'pending': return 'bg-yellow-900 text-yellow-300';
      case 'failed': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-russo mb-8">Личный кабинет</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Информация о пользователе */}
          <div className="col-span-1 bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-6">
              <FaUserCircle size={80} className="mx-auto text-blue-400 mb-4" />
              <h2 className="text-xl font-semibold">{user.companyName || 'Личный аккаунт'}</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
              
              {user.companyName && (
                <div className="flex items-center">
                  <FaBuilding className="mr-3 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Компания</p>
                    <p>{user.companyName}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center">
                <FaUserCircle className="mr-3 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Тип аккаунта</p>
                  <p>{user.userType === 'business' ? 'Юридическое лицо' : 'Физическое лицо'}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={logout} 
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                Выйти из аккаунта
              </button>
            </div>
          </div>
          
          {/* История запросов */}
          <div className="col-span-1 md:col-span-2 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaHistory className="mr-2 text-blue-400" />
              История запросов прайс-листа
            </h2>
            
            {loading ? (
              <div className="text-center py-8 text-gray-400">
                <FaSpinner className="animate-spin mx-auto mb-2 text-blue-400" size={24} />
                <p>Загрузка истории запросов...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-400">
                <p>{error}</p>
                <button 
                  onClick={() => {setLoading(true); window.location.reload()}}
                  className="mt-4 text-blue-400 hover:text-blue-300"
                >
                  Попробовать снова
                </button>
              </div>
            ) : priceRequests.length === 0 ? (
              <p className="text-center py-8 text-gray-400">У вас еще нет запросов прайс-листов</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 px-4 text-left">Дата запроса</th>
                      <th className="py-2 px-4 text-left">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceRequests.map((request) => (
                      <tr key={request._id} className="border-b border-gray-700">
                        <td className="py-3 px-4">
                          {formatDate(request.requestDate)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full ${getStatusColor(request.status)} text-xs`}>
                            {getStatusText(request.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-6">
              <button 
                onClick={() => router.push('/#price-request')} 
                className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                Запросить новый прайс-лист
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}