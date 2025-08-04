<p align="center">
  <img src="./assets/screen.png" alt="Скриншот проекта Vostok Trade" width="800px"> 
  </p>

<div align="center">

# Оптовый B2B-сервис "VOSTOK TRADE COMPANY"

_Современное Next.js приложение для оптовой продажи напитков с личным кабинетом и автоматической отправкой прайс-листов._

</div>

<p align="center">
    <img src="https://img.shields.io/badge/status-live-success?style=for-the-badge" alt="Статус">
    <img src="https://img.shields.io/github/last-commit/Doomsday058/vostok_trade_frontend?style=for-the-badge" alt="Последний коммит">
    <img src="https://img.shields.io/github/languages/top/Doomsday058/vostok_trade_frontend?style=for-the-badge" alt="Основной язык">
</p>

---

### ➡️ **[Посмотреть живое демо (Live Demo)](https://vostok-trade-frontend.vercel.app/)**

---

### 🏛️ Архитектура проекта

Этот проект является full-stack системой, состоящей из двух независимых, развернутых в облаке сервисов:

| Сервис | Описание | Репозиторий |
| :--- | :--- | :--- |
| 🎨 **Frontend (Next.js)** | Клиентская часть, которую вы видите. | _(текущий)_ |
| ⚙️ **Backend (Node.js)** | Основной API для работы с пользователями, товарами и базой данных MongoDB. | **[Перейти](https://github.com/Doomsday058/vostok_trade_backend)** |

---

### 🚀 Основные возможности

| Функция | Описание |
| :--- | :--- |
| **🔐 Аутентификация** | Регистрация и вход для юридических и физических лиц с использованием JWT. |
| **📋 Каталог продукции** | Отображение каталога товаров с детальным просмотром в модальном окне. |
| **📧 Автоматическая отправка прайса** | Пользователи могут запросить актуальный прайс-лист, который автоматически генерируется и отправляется на их email. |
| **👤 Личный кабинет** | Просмотр данных профиля и истории запросов прайс-листов. |
| **📱 Адаптивный дизайн** | Корректное отображение на всех устройствах благодаря Tailwind CSS. |

---

### 🛠️ Технологический стек

<p>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

---

<details>
<summary>▶️ 📦  <strong>Инструкции по установке и запуску</strong></summary>

<br>

1.  **Клонируйте репозиторий:**
    ```bash
    git clone [https://github.com/Doomsday058/vostok-trade-frontend.git](https://github.com/Doomsday058/vostok-trade-frontend.git)
    cd vostok-trade-frontend
    ```

2.  **Установите зависимости:**
    ```bash
    npm install
    ```

3.  **Создайте файл `.env.local`** в корне проекта и добавьте переменную для подключения к бэкенду:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

4.  **Запустите приложение для локальной разработки:**
    ```bash
    npm run dev
    ```

</details>
