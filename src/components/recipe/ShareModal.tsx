'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import type { Recipe } from '@/types';
import { Copy, Check } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
}

export default function ShareModal({ isOpen, onClose, recipe }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? `${window.location.origin}/recipe/${recipe.id}` : '';
  const text = `Check out this recipe: ${recipe.title}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: '\uD83D\uDCAC',
      url: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    },
    {
      name: 'Facebook',
      icon: '\uD83D\uDCD8',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: 'X (Twitter)',
      icon: '\uD83D\uDC26',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Email',
      icon: '\uD83D\uDCE7',
      url: `mailto:?subject=${encodeURIComponent(recipe.title + ' \u2014 FridgeChef AI')}&body=${encodeURIComponent(text + '\n\n' + url)}`,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Recipe" size="sm">
      {/* Copy link */}
      <div className="flex gap-2 mb-4">
        <input
          readOnly
          value={url}
          className="flex-1 px-3 py-2 rounded-lg border border-border text-sm bg-muted truncate"
        />
        <Button variant="secondary" size="sm" onClick={handleCopy} className="gap-1.5 shrink-0">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>

      {/* Social links */}
      <div className="grid grid-cols-2 gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium"
          >
            <span className="text-xl">{link.icon}</span>
            {link.name}
          </a>
        ))}
      </div>
    </Modal>
  );
}
