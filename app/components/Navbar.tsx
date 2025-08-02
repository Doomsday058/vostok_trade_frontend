//app/components/Navbar.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaSignOutAlt, FaUserCircle, FaHome } from 'react-icons/fa';
import { useUser } from './UserContext';
import BlueAuthModal from './AuthModal';

export default function Navbar() {
  const { user, logout } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // Получаем текущий путь
  const isAccountPage = pathname === '/account';

  // Отслеживание скролла для изменения фона навбара
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Закрыть выпадающее меню при клике вне
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    if (user) {
      // Если пользователь авторизован, показываем/скрываем меню
      setShowDropdown(!showDropdown);
    } else {
      // Если не авторизован, показываем модальное окно авторизации
      setShowAuthModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    // Если мы на странице аккаунта, перенаправляем на главную
    if (isAccountPage) {
      window.location.href = '/';
    }
  };

  // Формируем ссылки в зависимости от того, где мы находимся
  const getLink = (anchor: string) => {
    if (isAccountPage) {
      return `/${anchor}`;
    }
    return `#${anchor}`;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-black py-2' : 'bg-black bg-opacity-70 backdrop-blur-lg py-4'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <Link href="/" className="text-2xl font-bold font-russo text-white">
            VOSTOK <span className="text-blue-500">TRADE</span> COMPANY
          </Link>
          <nav>
            <ul className="flex space-x-8 text-lg items-center">
              <li>
                <Link 
                  href={isAccountPage ? "/" : "#hero"} 
                  className="text-white transition-all duration-300 hover:text-blue-400 font-montserrat"
                >
                  Главная
                </Link>
              </li>
              <li>
                <Link 
                  href={getLink("about")} 
                  className="text-white transition-all duration-300 hover:text-blue-400 font-montserrat"
                >
                  О компании
                </Link>
              </li>
              <li>
                <Link 
                  href={getLink("products")} 
                  className="text-white transition-all duration-300 hover:text-blue-400 font-montserrat"
                >
                  Продукция
                </Link>
              </li>
              <li>
                <Link 
                  href={getLink("reviews")} 
                  className="text-white transition-all duration-300 hover:text-blue-400 font-montserrat"
                >
                  Отзывы
                </Link>
              </li>
              <li>
                <Link 
                  href={getLink("contact")} 
                  className="text-white transition-all duration-300 hover:text-blue-400 font-montserrat"
                >
                  Контакты
                </Link>
              </li>
              <li className="relative">
                <button 
                  onClick={handleProfileClick}
                  className="flex items-center text-white transition-all duration-300 hover:text-blue-400"
                  aria-label={user ? "Личный кабинет" : "Вход/Регистрация"}
                >
                  {user ? (
                    <div className="flex items-center">
                      <FaUserCircle size={20} className="mr-2 text-blue-400" />
                      <span className="hidden sm:block truncate max-w-[120px]">{user.email}</span>
                    </div>
                  ) : (
                    <FaUser size={20} />
                  )}
                </button>
                
                {/* Выпадающее меню для авторизованного пользователя */}
                {user && showDropdown && (
                  <div 
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 z-10 border border-gray-800"
                  >
                    {isAccountPage ? (
                      <Link 
                        href="/" 
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FaHome className="mr-2" /> На главную
                      </Link>
                    ) : (
                      <Link 
                        href="/account" 
                        className="block px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center"
                        onClick={() => setShowDropdown(false)}
                      >
                        <FaUserCircle className="mr-2" /> Личный кабинет
                      </Link>
                    )}
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="mr-2" /> Выйти
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <BlueAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}