import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookResponse, Book } from '../types/book';

interface CartContextType {
  cartItems: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (book: Book) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC = ({ children }) => {
  const [cartItems, setCartItems] = useState<Book[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(items);
  }, []);

  const addToCart = (book: Book) => {
    setCartItems([...cartItems, book]);
    localStorage.setItem('cartItems', JSON.stringify([...cartItems, book]));
  };

  const removeFromCart = (book: Book) => {
    const updatedCart = cartItems.filter((item) => item.id !== book.id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
