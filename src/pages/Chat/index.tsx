import React, { useEffect, useState } from 'react';
import socket from './socket';
import './App.css';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React com Socket.IO</h1>
        <div>
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
        <div>
          <h2>Mensagens:</h2>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Chat;
