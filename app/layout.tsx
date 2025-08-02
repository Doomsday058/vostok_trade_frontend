//app/layout.tsx
'use client';
import { useEffect } from 'react';
import { UserProvider } from './components/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AOS from 'aos';
import './styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Инициализация AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <html lang="ru">
      <head>
        <title>VOSTOK TRADE COMPANY</title>
        <meta name="description" content="Оптовые поставки напитков высшего качества" />
      </head>
      <body className="bg-gray-900 font-montserrat">
        <UserProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}