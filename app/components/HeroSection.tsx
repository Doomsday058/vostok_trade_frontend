// app/components/HeroSection.tsx
'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HeroSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section
      id="hero"
      className="h-screen common-bg-section flex items-center justify-center"
    >
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold font-russo mb-6" data-aos="fade-down">
          Добро пожаловать в <span className="text-blue-500">VOSTOK TRADE COMPANY</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 font-montserrat" data-aos="fade-up">
          Не просто поставщик — ваш партнер по росту
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="zoom-in">
          <a
            href="#products"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg text-white text-lg font-semibold transform hover:scale-105 font-montserrat"
          >
            Наш ассортимент
          </a>
        </div>
      </div>

      {/* Плавный переход к следующей секции */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}