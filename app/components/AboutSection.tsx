import { FaTruck, FaHandshake, FaAward, FaChartLine } from 'react-icons/fa';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 common-bg-section">
      <div className="max-w-6xl mx-auto px-4 text-white relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-russo mb-4" data-aos="fade-up">О компании</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" data-aos="zoom-in" data-aos-delay="200"></div>
        </div>
        
        {/* Основное содержимое */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Изображение с эффектом */}
          <div className="md:w-1/2" data-aos="fade-right">
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-500/20 rounded-lg blur-lg"></div>
              <img 
                src="/about.jpg" 
                alt="О компании VOSTOK TRADE COMPANY" 
                className="rounded-lg shadow-lg border border-gray-800 relative z-10 hover:transform hover:scale-[1.02] transition-all duration-300"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold font-russo opacity-90">
                2023
              </div>
            </div>
          </div>
          
          {/* Текст о компании */}
          <div className="md:w-1/2" data-aos="fade-left">
            <h3 className="text-2xl font-russo mb-4 text-blue-400">VOSTOK TRADE COMPANY</h3>
            <p className="text-lg leading-relaxed font-montserrat mb-6">
              Ваш надежный партнер в оптовой торговле напитками. Мы предлагаем широкий ассортимент продукции высокого качества. Наша цель – обеспечить наших клиентов лучшими условиями сотрудничества и быстрой доставкой.
            </p>
            <p className="text-lg leading-relaxed font-montserrat mb-8">
              Работая с нами, вы получаете не только качественный товар, но и профессиональную консультацию по подбору ассортимента, гибкие условия оплаты и индивидуальный подход к каждому клиенту.
            </p>
            
            {/* Ключевые преимущества */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all">
                <div className="bg-blue-600 p-3 rounded-lg text-white">
                  <FaTruck size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Быстрая доставка</h4>
                  <p className="text-gray-300 text-sm">Доставляем заказы точно в срок</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all">
                <div className="bg-blue-600 p-3 rounded-lg text-white">
                  <FaHandshake size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Гибкие условия</h4>
                  <p className="text-gray-300 text-sm">Индивидуальный подход к каждому клиенту</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all">
                <div className="bg-blue-600 p-3 rounded-lg text-white">
                  <FaAward size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Гарантия качества</h4>
                  <p className="text-gray-300 text-sm">Только проверенные поставщики</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all">
                <div className="bg-blue-600 p-3 rounded-lg text-white">
                  <FaChartLine size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Развитие бизнеса</h4>
                  <p className="text-gray-300 text-sm">Помогаем клиентам расти вместе с нами</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}