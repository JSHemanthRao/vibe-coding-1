import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';
import './Chatbot.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('sharvex_chat_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
    }
    return [
      {
        id: 1,
        text: "Greetings. I am the Sharvex intelligence interface. How shall we begin architecting your future today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('sharvex_chat_history', JSON.stringify(messages));
  }, [messages]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = useCallback((input: string): string => {
    const lowInput = input.toLowerCase();
    
    // Knowledge Base with Intent Scoring
    const knowledgeBase = [
      {
        intents: ['portfolio', 'investments', 'companies', 'backed'],
        response: "Sharvex strategically backs ventures that define the next decade. Our portfolio spans Neural Computing, Sustainable Aerospace, and Decentralized Infrastructure. Each partner is selected for their potential to disrupt and lead their respective industries."
      },
      {
        intents: ['contact', 'partner', 'reach out', 'email', 'touch'],
        response: "For strategic partnerships and investment inquiries, our executive advisory board can be reached at strategy@sharvex.com. We prioritize high-impact collaborations that align with our long-term vision."
      },
      {
        intents: ['who', 'what', 'sharvex', 'about', 'firm'],
        response: "Sharvex is a premier strategic capital and global advisory firm. We don't just invest; we architect. We specialize in taking visionary concepts and providing the institutional framework, capital, and strategic guidance needed to achieve global dominance."
      },
      {
        intents: ['service', 'advisory', 'consult', 'help', 'do'],
        response: "We provide three core pillars of excellence: Strategic Capital (Investment), Global Advisory (Transformation), and Venture Architecting (Building from zero). Which of these aligns with your current objectives?"
      },
      {
        intents: ['future', 'vision', 'tomorrow', 'next'],
        response: "At Sharvex, we believe the future belongs to those who build it. We focus on 'Deep Frontier' technologies—those that solve fundamental human challenges through engineering and vision. Tomorrow is a landscape we are actively architecting today."
      },
      {
        intents: ['career', 'job', 'work', 'join'],
        response: "We are always looking for exceptional minds—architects, strategists, and visionaries. While we don't have a public job board, we review high-caliber portfolios at careers@sharvex.com."
      },
      {
        intents: ['hello', 'hi', 'hey', 'greetings'],
        response: "Greetings. I am the Sharvex intelligence interface. How shall we begin architecting your future today?"
      }
    ];

    // Find the best match based on keyword density
    let bestMatch = null;
    let maxScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      for (const intent of entry.intents) {
        if (lowInput.includes(intent)) score++;
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = entry.response;
      }
    }

    if (bestMatch && maxScore > 0) return bestMatch;

    // Fallback for general questions (Simulated Intelligence)
    if (lowInput.includes('?') || lowInput.length > 20) {
      const generalResponses = [
        "That requires a strategic perspective. Our advisory team typically analyzes such variables through a 'Vision-First' lens. Would you like to explore how Sharvex handles such complexity?",
        "Interesting. That aligns with our 'Deep Frontier' philosophy. We often find that such questions lead to the most significant institutional breakthroughs.",
        "Precision in such matters is key. While I handle primary interface duties, our specialists can provide the deep-dive analysis your query deserves. Shall I record this for our partners?",
        "You're thinking at scale. That is exactly the type of visionary inquiry we encourage at Sharvex. Let's delve deeper into the implications of that."
      ];
      return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    }

    return "I'm processing your inquiry through our strategic filters. Could you elaborate on the institutional or visionary context of your question?";
  }, []);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setInputValue('');
    
    // Respond instantly without async blocking UI delays
    requestAnimationFrame(() => {
      setMessages((prev) => {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: getBotResponse(userMessage.text),
          sender: 'bot',
          timestamp: new Date(),
        };
        return [...prev, userMessage, botMessage];
      });
    });
  }, [inputValue, getBotResponse]);

  const renderedMessages = useMemo(() => {
    return messages.map((msg) => (
      <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
        <div className="avatar">
          {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
        </div>
        <div className="message-bubble">
          {msg.text}
          <span className="timestamp">
            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    ));
  }, [messages]);

  return (
    <div className={`chatbot-container ${isOpen ? 'active' : ''}`}>
      {/* Toggle Button */}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-header">
          <div className="header-info">
            <div className="status-dot"></div>
            <span>Sharvex AI Assistant</span>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="chat-messages">
          {renderedMessages}
          {isTyping && (
            <div className="message-wrapper bot">
              <div className="avatar"><Bot size={14} /></div>
              <div className="message-bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-btn" onClick={handleSend}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default Chatbot;
