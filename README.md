# Shadow Bot AI — Telegram Mini App
## О проекте

**Shadow Bot AI** — это современное мини-приложение для Telegram, в котором вы можете пообщаться с искусственным интеллектом в разных стилях: от грубого и ленивого до фембойчика и юмориста.  
Проект состоит из Telegram-бота и мини-приложения с авторизацией, регистрацией и web-интерфейсом на React.

---

## Возможности

- 🤖 **AI-чат** с выбором стиля общения (грубый, ленивый, фембой, юморист, обычный)
- 📝 **Регистрация и вход** через мини-приложение
- 🔒 **JWT-аутентификация**
- 💾 Хранение пользователей в JSON
- ⚡️ Быстрый web-интерфейс на React
- 📦 Простая интеграция с Telegram

---

## Структура репозитория

```
bot-development/           # Telegram-бот на Telegraf
mini-app-development/
  ├─ ai/                   # Логика AI и промпты
  ├─ auth/                 # Страницы авторизации/регистрации
  ├─ data/                 # Пользователи (users.json)
  └─ my-react-app/         # Web-интерфейс (React + Vite)
```

---

## Быстрый старт

### 1. Клонируйте репозиторий

```sh
git clone https://github.com/your-username/shadow-bot-ai.git
cd shadow-bot-ai
```

### 2. Установите зависимости

#### Для backend и AI

```sh
cd mini-app-development
npm install
```

#### Для frontend

```sh
cd my-react-app
npm install
```

### 3. Запуск

#### Backend + AI

```sh
cd mini-app-development
npm start
```

#### Frontend (разработка)

```sh
cd my-react-app
npm run preview
```

### 4. Запуск Telegram-бота

```sh
cd ../../bot-development
npm install
npm start
```

---

## Настройка Ollama и модели Llama 3

1. Скачайте Ollama на свой ПК.
2. Откройте терминал и загрузите модель Llama 3:

```sh
ollama pull llama3
```

3. Запуск Ollama:

```sh
ollama run llama3 
```

> Убедитесь, что Ollama работает локально перед запуском приложения.

---

## Версия модели AI

В файле `mini-app-development/ai/ai-logic.js` используется переменная c версией модели ии (вы можете изменить ее, если она скачана и запущена):

```js
const MODEL = 'llama3';
```

---

## Переменные окружения

Создайте `.env` файлы в папках `bot-development` и `mini-app-development`:

**Пример для mini-app-development/.env:**
```
JWT_SECRET=your_secret_key
JWT_EXPIRES=24h
```

**Пример для bot-development/.env:**
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
```

---
