import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Sesuaikan path jika perlu
import { CartProvider } from '@/contexts/CartContext';
import Head from 'next/head'; // Import Head from next/head

import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Book Store</title> {/* Set the title to "Book Store" */}
        {/* You can also set other meta tags and links here */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ThemeProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
