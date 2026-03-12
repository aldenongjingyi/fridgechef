import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthModal from '@/components/auth/AuthModal';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Cheffy — Turn Your Ingredients Into Delicious Meals',
  description: 'AI-powered recipe generator that transforms your available ingredients into delicious, step-by-step recipes. Save money, reduce food waste, and discover new meals.',
  keywords: ['recipe generator', 'AI recipes', 'meal planning', 'food waste reduction', 'cooking', 'ingredients'],
  openGraph: {
    title: 'Cheffy — Turn Your Ingredients Into Delicious Meals',
    description: 'AI-powered recipe generator that transforms your available ingredients into delicious recipes. Reduce waste, save money, discover new meals.',
    url: 'https://fridgechef-pi.vercel.app',
    siteName: 'Cheffy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Cheffy — AI-Powered Recipe Generator',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cheffy — Turn Your Ingredients Into Delicious Meals',
    description: 'AI-powered recipe generator. Tell us what ingredients you have and get a personalised recipe in seconds.',
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=630&fit=crop'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased font-sans`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AuthModal />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
