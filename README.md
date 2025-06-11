# Solana Wallet Tools

Веб-приложение для работы с кошельками Solana, построенное на Next.js. Позволяет генерировать новые ключи, получать информацию об аккаунтах и запрашивать тестовые токены (airdrop).

## 🚀 Возможности

- **Генерация ключей**: Создание новых пар ключей Solana (публичный/приватный)
- **Информация об аккаунтах**: Получение детальной информации о любом аккаунте Solana
- **Airdrop**: Запрос тестовых токенов SOL для разработки
- **Интеграция с Phantom**: Подключение к кошельку Phantom
- **Современный UI**: Красивый и отзывчивый интерфейс

## 🛠 Технологии

- **Next.js 14** - React фреймворк
- **@solana/web3.js** - JavaScript SDK для Solana
- **bs58** - Base58 кодирование/декодирование
- **CSS Modules** - Стилизация компонентов

## 📋 Предварительные требования

- **Node.js** версии 18 или выше
- **npm** или **yarn**
- **Phantom Wallet** (для функции airdrop)

## ⚡ Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com:Gob26/solana_wallet.git
cd solana_wallet
```

### 2. Установка зависимостей

```bash
npm install
# или
yarn install
```

### 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
SOL_RPC=https://api.devnet.solana.com
# Для mainnet: https://api.mainnet-beta.solana.com
```

### 4. Запуск проекта

```bash
npm run dev
# или
yarn dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
├── app/
│   ├── page.js              # Главная страница
│   ├── page.module.css      # Стили для главной страницы
│   └── layout.js            # Общий layout
├── lib/
│   └── const.js             # Константы и настройки Solana
├── public/                  # Статические файлы
├── .env.local              # Переменные окружения (создать вручную)
├── package.json
└── README.md
```

## 🎯 Использование

### Генерация новых ключей

1. Нажмите кнопку **"Generate Key"**
2. Приложение создаст новую пару ключей Solana
3. Публичный и приватный ключи отобразятся в формате Base58

⚠️ **Важно**: Никогда не делитесь приватными ключами!

### Получение информации об аккаунте

1. Кликните на один из предустановленных кошельков в списке
2. Или используйте любой публичный ключ Solana
3. Приложение покажет:
   - Баланс в SOL и lamports
   - Владельца аккаунта
   - Размер данных
   - Статус исполняемости
   - Эпоху аренды

### Запрос Airdrop

1. Установите и настройте Phantom Wallet
2. Переключитесь на Devnet в настройках кошелька
3. Нажмите кнопку **"AirDrop"**
4. Подтвердите подключение кошелька
5. Получите 1 SOL на ваш аккаунт (только в тестовой сети)

## 🔧 Конфигурация

### Изменение RPC провайдера

В файле `lib/const.js` можно изменить RPC сервер:

```javascript
export const connection = new Connection("YOUR_RPC_ENDPOINT", "confirmed");
```

### Популярные RPC провайдеры:

- **Devnet**: `https://api.devnet.solana.com`
- **Mainnet**: `https://api.mainnet-beta.solana.com`
- **Testnet**: `https://api.testnet.solana.com`

## 🐛 Устранение неполадок

### Ошибка подключения к RPC

```bash
Error: connection.getParsedAccountInfo is not a function
```

**Решение**: Убедитесь, что правильно импортируете `connection` из `lib/const.js`, а не из других источников.

### Phantom не найден

**Решение**: 
1. Установите [Phantom Wallet](https://phantom.app/)
2. Создайте или импортируйте кошелек
3. Переключитесь на Devnet для тестирования

### Airdrop не работает

**Решение**:
1. Убедитесь, что используете Devnet
2. Проверьте лимиты airdrop (максимум 2 SOL в день)
3. Попробуйте позже, если сервер перегружен

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для фичи (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Отправьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для подробностей.

## 🔗 Полезные ссылки

- [Solana Documentation](https://docs.solana.com/)
- [Solana Web3.js Documentation](https://solana-labs.github.io/solana-web3.js/)
- [Phantom Wallet](https://phantom.app/)
- [Next.js Documentation](https://nextjs.org/docs)

## 👨‍💻 Автор

Ваше имя - [@your-username](https://github.com/your-username)

## 🙏 Благодарности

- Команде Solana за отличную документацию
- Команде Next.js за потрясающий фреймворк
- Сообществу Solana за поддержку

---

**⭐ Поставьте звезду, если проект был полезен!**