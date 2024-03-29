import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Adjust the path as needed
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
