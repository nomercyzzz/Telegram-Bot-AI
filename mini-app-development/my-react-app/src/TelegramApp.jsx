import React, { useEffect } from 'react';

export default function TelegramApp() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const sendMessage = () => {
    const msg = "Привет от Mini App!";
    window.Telegram.WebApp.sendData(JSON.stringify({ message: msg }));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini App работает ✅</h1>
      <button onClick={sendMessage}>Отправить сообщение в бота</button>
    </div>
  );
}
