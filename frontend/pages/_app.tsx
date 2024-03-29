import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Sesuaikan path jika perlu
import { CartProvider } from '@/contexts/CartContext';

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ThemeProvider>
  );
};


export default MyApp;
