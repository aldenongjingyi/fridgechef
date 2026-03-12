'use client';

import { useState, useRef, useEffect } from 'react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import type { Recipe, ChatMessage } from '@/types';
import { Send, ChefHat, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AskAiChefModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
}

export default function AskAiChefModal({ isOpen, onClose, recipe }: AskAiChefModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const suggestions = [
    'Can I substitute any ingredients?',
    'How do I make this spicier?',
    'Can I make this ahead of time?',
    'What wine pairs well with this?',
  ];

  const handleSend = async (message?: string) => {
    const text = message || input.trim();
    if (!text) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      const res = await fetch('/api/recipes/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          recipeTitle: recipe.title,
          history: messages,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, I couldn\'t process your question. Please try again.' }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ask the AI Chef" size="md">
      <div className="flex flex-col h-[400px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.length === 0 && (
            <div className="text-center py-8 space-y-4">
              <ChefHat className="w-10 h-10 text-brand-orange mx-auto" />
              <p className="text-sm text-muted-foreground">
                Ask me anything about &quot;{recipe.title}&quot;!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={cn(
                'flex gap-2 items-start',
                msg.role === 'user' ? 'flex-row-reverse' : ''
              )}
            >
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center shrink-0',
                msg.role === 'user' ? 'bg-brand-orange/10' : 'bg-muted'
              )}>
                {msg.role === 'user'
                  ? <User className="w-4 h-4 text-brand-orange" />
                  : <ChefHat className="w-4 h-4 text-muted-foreground" />
                }
              </div>
              <div className={cn(
                'max-w-[80%] px-3 py-2 rounded-2xl text-sm',
                msg.role === 'user'
                  ? 'bg-brand-orange text-white rounded-br-sm'
                  : 'bg-muted text-foreground rounded-bl-sm'
              )}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 items-start">
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="bg-muted px-3 py-2 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about this recipe..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange"
            disabled={loading}
          />
          <Button
            variant="primary"
            size="default"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
