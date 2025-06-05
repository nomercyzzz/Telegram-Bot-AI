import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const ROLES = {
  evil:     { label: '🦇 злой',      system: 'evil'     },
  lazy:     { label: '😴 ленивый',  system: 'lazy'     },
  femboy:   { label: '🌸 фембой',   system: 'femboy'   },
  humor:    { label: '😂 юморист',  system: 'humor'    },
  normal:   { label: '😊 обычный',  system: 'normal'   }
};

export default function App() {
  const [messages, setMessages]   = useState([{ from: 'bot', text: 'Привет! Выбери мой стиль ↓' }]);
  const [input, setInput]         = useState('');
  const [role,  setRole]          = useState('normal');
  const [loading, setLoading]     = useState(false);
  const [theme, setTheme]         = useState(() => 'dark');
  const chatRef = useRef(null);

  // localStorage: загрузка сообщений при старте
  useEffect(() => {
    const saved = localStorage.getItem('chat-messages');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // localStorage: сохранение сообщений при изменении 
  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);

  /* ---------- helpers ---------- */
  const scrollDown = () =>
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });

  const addMsg = (m) => setMessages((prev) => [...prev, m]);

  /* ---------- send ---------- */
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    addMsg({ from: 'user', text });
    setInput('');
    setLoading(true);

    try {
      const r   = await fetch('/api/message', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ message: text, role })
      });
      const { reply = '⚠️ Нет ответа' } = await r.json();
      addMsg({ from: 'bot', text: reply });
    } catch {
      addMsg({ from: 'bot', text: '⚠️ Ошибка сети' });
    } finally {
      setLoading(false);
    }
  };

  /* ---------- effects ---------- */
  useEffect(scrollDown, [messages]);
  useEffect(() => document.documentElement.setAttribute('theme', theme), [theme]);

  /* ---------- ui ---------- */
  return (
    <div className="app">
      <header className="top">
        <h1>Чат-бот ({ROLES[role].label})</h1>
        <div className="stats">
          💬 <span>{messages.length}</span>
        </div>
      </header>

      <div className="role-bar">
        {Object.entries(ROLES).map(([key, { label }]) => (
          <button
            key={key}
            className={key === role ? 'active' : ''}
            onClick={() => setRole(key)}
            disabled={loading}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="chat" ref={chatRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>{m.text}</div>
        ))}
        {loading && <div className="msg bot typing"><span/></div>}
      </div>

      <div className="input-bar">
        <input
          placeholder="Введите сообщение…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>➤</button>
      </div>

      <footer className="bottom">
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Сменить тему
        </button>
        <button onClick={() => setMessages([])}>Очистить чат</button>
      </footer>
    </div>
  );
}
