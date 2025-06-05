import React, { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Привет! Напиши что-нибудь.' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('https://your-backend.vercel.app/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, chat_id: window.Telegram.WebApp.initDataUnsafe?.user?.id })
      });

      const data = await response.json();
      const botMessage = { from: 'bot', text: data.result.text || '(пустой ответ)' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Ошибка отправки 😢' }]);
    }
  };

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h2>🧠 Чат с ботом</h2>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 12,
        height: 300,
        overflowY: 'auto',
        marginBottom: 12,
        background: '#f9f9f9'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.from === 'user' ? 'right' : 'left',
            marginBottom: 6
          }}>
            <span style={{
              display: 'inline-block',
              padding: '8px 12px',
              background: msg.from === 'user' ? '#d0f0ff' : '#e0e0e0',
              borderRadius: 12
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
          placeholder="Введите сообщение..."
        />
        <button onClick={sendMessage} style={{
          padding: '8px 16px',
          borderRadius: 8,
          border: 'none',
          background: '#0088cc',
          color: '#fff'
        }}>
          Отправить
        </button>
      </div>
    </div>
  );
}
