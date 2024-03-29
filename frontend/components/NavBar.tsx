import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HomeIcon, ShoppingCartIcon, LoginIcon, StarIcon } from '@heroicons/react/solid';
import { useCart } from '../contexts/CartContext';

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0); // State untuk jumlah item di keranjang
  const { cartItems } = useCart();

  useEffect(() => {
    const customerType = localStorage.getItem('customerType');
    setIsLoggedIn(!!customerType);

    // Mengambil jumlah item di keranjang dari local storage
    // const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    // setCartCount(cartItems.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerType');
    localStorage.removeItem('cartItems');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Book Store</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" passHref>
              <div className="flex items-center space-x-2 cursor-pointer">
                <HomeIcon className="w-4 h-4" />
                <span className="hover:underline">Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/bestsellers" passHref>
              <div className="flex items-center space-x-2 cursor-pointer">
                <StarIcon className="w-4 h-4" />
                <span className="hover:underline">Best Sellers</span>
              </div>
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/cart" passHref>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <ShoppingCartIcon className="w-4 h-4" />
                    <span className="hover:underline">Cart {cartItems.length !== 0 ? `(${cartItems.length})` : ''}</span>
                  </div>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer">
                  <LoginIcon className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login" passHref>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <LoginIcon className="w-4 h-4" />
                  <span className="hover:underline">Login</span>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
