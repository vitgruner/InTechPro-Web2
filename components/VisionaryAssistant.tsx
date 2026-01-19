import React, { useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, MessageSquareText } from 'lucide-react';
import { getVisionaryResponse } from '../services/geminiService';
import { Message } from '../types';

const FormattedContent = ({ content }: { content: string }) => {
  const paragraphs = content.split('\n').filter(p => p.trim() !== '');
  return (
    <div className="space-y-3 text-left">
      {paragraphs.map((para, idx) => {
        const isListItem = para.trim().startsWith('-') || para.trim().startsWith('*');
        const cleanText = isListItem ? para.trim().substring(1).trim() : para;
        const parts = cleanText.split(/(\*\*.*?\*\*)/g);
        const renderedText = parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-black text-blue-700 dark:text-blue-300">{part.slice(2, -2)}</strong>;
          }
          return part;
        });
        if (isListItem) {
          return (
            <div key={idx} className="flex gap-2 pl-2">
              <span className="text-blue-600 dark:text-blue-400 mt-1.5">•</span>
              <p className="flex-1">{renderedText}</p>
            </div>
          );
        }
        return <p key={idx} className="leading-relaxed">{renderedText}</p>;
      })}
    </div>
  );
};

interface VisionaryAssistantProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  compact?: boolean;
}

const VisionaryAssistant = ({
  messages,
  setMessages,
  isLoading,
  setIsLoading,
  compact = false
}: VisionaryAssistantProps) => {
  const [input, setInput] = React.useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Přidáme prázdnou zprávu asistenta, kterou budeme plnit streamem
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    let accumulatedText = "";
    try {
      await getVisionaryResponse(userMessage, (chunk) => {
        accumulatedText += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          if (newMessages[lastIndex].role === 'assistant') {
            newMessages[lastIndex] = { ...newMessages[lastIndex], content: accumulatedText };
          }
          return newMessages;
        });
      });
    } catch (error) {
      console.error("Streaming error:", error);
      // Fallback logic if needed, but getVisionaryResponse handles its own errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`glass-panel rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl relative transition-all duration-500 bg-white/80 dark:bg-black/40 backdrop-blur-2xl flex flex-col h-full`}>
      <div className="p-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <Sparkles className="text-white w-4 h-4" />
          </div>
          <div className="text-left">
            <h3 className="font-black text-[11px] text-slate-900 dark:text-white uppercase tracking-widest">AI Projektant</h3>
            <p className="text-[8px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em]">Konzultace v reálném čase</p>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`${compact ? 'min-h-[200px] max-h-[300px]' : 'min-h-[300px] max-h-[450px]'} overflow-y-auto p-5 space-y-6 scrollbar-hide transition-all flex-1`}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'assistant'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 dark:bg-white/10 text-slate-500'
              }`}>
              {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] leading-relaxed ${msg.role === 'assistant'
              ? 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-gray-300 border border-slate-100 dark:border-white/5'
              : 'bg-blue-600 text-white font-medium ml-auto rounded-tr-none'
              }`}>
              <FormattedContent content={msg.content} />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            </div>
          </div>
        )}
      </div>

      <div className="p-5 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 mt-auto">
        <form onSubmit={handleSubmit} className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Poraďte se o své vizi..."
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-5 pr-12 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisionaryAssistant;