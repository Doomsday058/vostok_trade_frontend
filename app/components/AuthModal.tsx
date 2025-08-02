//app/components/AuthModal.tsx
'use client';
import { useState } from 'react';
import Modal from './Modal';
import { useUser } from './UserContext';
import { useRouter } from 'next/navigation';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormMode = 'login' | 'register' | 'forgot';
type UserType = 'personal' | 'business';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<FormMode>('login');
  const [userType, setUserType] = useState<UserType>('personal');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    companyName: '', 
    email: '', 
    password: ''
  });
  const [forgotForm, setForgotForm] = useState({ email: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const { login } = useUser();
  const router = useRouter();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleForgotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotForm({ ...forgotForm, [e.target.name]: e.target.value });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value as UserType);
    // Если выбран личный аккаунт, очищаем поле компании
    if (e.target.value === 'personal') {
      setRegisterForm({ ...registerForm, companyName: '' });
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка входа');
      }
      
      login(data.token, data.user);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Создаем объект с данными для отправки
      const userData = {
        ...registerForm,
        userType,
        // Очищаем название компании, если это личный аккаунт
        companyName: userType === 'personal' ? '' : registerForm.companyName
      };
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
      }
      
      login(data.token, data.user);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // В реальном приложении тут был бы запрос к API для восстановления пароля
      // Имитируем успешную отправку
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResetSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для переключения режимов модального окна
  const switchMode = (newMode: FormMode) => {
    setError('');
    setMode(newMode);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={
        mode === 'login' ? 'Вход в аккаунт' : 
        mode === 'register' ? 'Регистрация' : 
        'Восстановление пароля'
      }
    >
      {error && (
        <div className="bg-red-900/30 border border-red-800 text-white p-4 rounded mb-5">
          {error}
        </div>
      )}

      {mode === 'login' && (
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-white mb-2 font-montserrat">Email</label>
            <input 
              name="email" 
              type="email" 
              value={loginForm.email} 
              onChange={handleLoginChange} 
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-white mb-2 font-montserrat">Пароль</label>
            <input 
              name="password" 
              type="password" 
              value={loginForm.password} 
              onChange={handleLoginChange} 
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500" 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-white font-montserrat font-semibold disabled:opacity-70"
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
          <div className="flex justify-between text-sm mt-4 font-montserrat">
            <button 
              type="button" 
              onClick={() => switchMode('forgot')}
              className="text-gray-400 hover:text-gray-300"
            >
              Забыли пароль?
            </button>
            <button 
              type="button" 
              onClick={() => switchMode('register')}
              className="text-gray-400 hover:text-gray-300"
            >
              Регистрация
            </button>
          </div>
        </form>
      )}

      {mode === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-5">
          <div>
            <label className="block text-white mb-2 font-montserrat">Тип аккаунта</label>
            <select
              value={userType}
              onChange={handleUserTypeChange}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              <option value="personal">Физическое лицо</option>
              <option value="business">Юридическое лицо</option>
            </select>
          </div>

          {userType === 'business' && (
            <div>
              <label className="block text-white mb-2 font-montserrat">Название компании</label>
              <input 
                name="companyName" 
                type="text" 
                value={registerForm.companyName} 
                onChange={handleRegisterChange} 
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500" 
                required={userType === 'business'}
              />
            </div>
          )}

          <div>
            <label className="block text-white mb-2 font-montserrat">Email</label>
            <input 
              name="email" 
              type="email" 
              value={registerForm.email} 
              onChange={handleRegisterChange} 
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-white mb-2 font-montserrat">Пароль</label>
            <input 
              name="password" 
              type="password" 
              value={registerForm.password} 
              onChange={handleRegisterChange} 
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-white font-montserrat font-semibold disabled:opacity-70"
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          
          <div className="text-sm mt-4 text-center font-montserrat">
            <button 
              type="button" 
              onClick={() => switchMode('login')}
              className="text-gray-400 hover:text-gray-300"
            >
              Уже есть аккаунт? Войти
            </button>
          </div>
        </form>
      )}

      {mode === 'forgot' && !resetSent && (
        <form onSubmit={handleForgotSubmit} className="space-y-5">
          <p className="text-gray-300 mb-4 font-montserrat">
            Введите ваш email, и мы отправим инструкции по восстановлению пароля.
          </p>
          <div>
            <label className="block text-white mb-2 font-montserrat">Email</label>
            <input 
              name="email" 
              type="email" 
              value={forgotForm.email} 
              onChange={handleForgotChange} 
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500" 
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-white font-montserrat font-semibold disabled:opacity-70"
          >
            {isLoading ? 'Отправка...' : 'Восстановить пароль'}
          </button>
          <div className="text-sm mt-4 text-center font-montserrat">
            <button 
              type="button" 
              onClick={() => switchMode('login')}
              className="text-gray-400 hover:text-gray-300"
            >
              Вернуться ко входу
            </button>
          </div>
        </form>
      )}

      {mode === 'forgot' && resetSent && (
        <div className="text-center py-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-green-500 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-xl font-semibold text-white mb-2 font-montserrat">Инструкции отправлены</p>
          <p className="text-gray-300 mb-6 font-montserrat">
            Проверьте вашу электронную почту для получения инструкций по восстановлению пароля.
          </p>
          <button 
            onClick={() => switchMode('login')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded transition-colors text-white font-montserrat font-semibold"
          >
            Вернуться ко входу
          </button>
        </div>
      )}
    </Modal>
  );
}