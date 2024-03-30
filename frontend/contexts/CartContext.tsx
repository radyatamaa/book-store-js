import React, { createContext, useContext, useState, useEffect, ReactNode  } from 'react';
import { BookResponse, Book } from '../types/book';

interface CartContextType {
  cartItems: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (book: Book) => void;
  removeAllCarts: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Book[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  }, []);

  const addToCart = (book: Book) => {
    const existingBookIndex = cartItems.findIndex((item) => item.id === book.id);
  
    if (existingBookIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingBookIndex].qty += book.qty;
      updatedCartItems[existingBookIndex].total_price += book.price;
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      book.qty = 1;
      book.total_price = book.price;
      setCartItems([...cartItems, book]);
      localStorage.setItem('cartItems', JSON.stringify([...cartItems, book]));
    }
  };
  

  const removeFromCart = (book: Book) => {
    const updatedCart = cartItems.filter((item) => item.id !== book.id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeAllCarts = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,removeAllCarts }}>
      {children}
    </CartContext.Provider>
  );
};
