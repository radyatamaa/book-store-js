import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HomeIcon, ShoppingCartIcon, LoginIcon, StarIcon } from '@heroicons/react/solid';
import { useCart } from '../contexts/CartContext';
import Modal from '../components/Modal';
import { useRouter } from 'next/router';

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ message: '', status: '' });
  const router = useRouter();

  useEffect(() => {
    const customerLogin = localStorage.getItem('customerLogin');
    setIsLoggedIn(!!customerLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerLogin');
    localStorage.removeItem('cartItems');
    setIsLoggedIn(false);
    setModalMessage({ message: 'Logout success', status: 'success' });
    setModalOpen(true);
   
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (modalMessage.status === 'success') {
      window.location.href = '/';
    }
  };
  const handleCartClick = () => {
    setShowModal(true);
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
                <div className="flex items-center space-x-2 cursor-pointer" onClick={handleCartClick}>
                  <ShoppingCartIcon className="w-4 h-4" />
                  <span className="hover:underline">Cart {cartItems.length !== 0 ? `(${cartItems.length})` : ''}</span>
                </div>
              </li>
              <li>
                <button onClick={handleLogout} className="flex items-center space-x-2 cursor-pointer">
                  <LoginIcon className="w-4 h-4" />
                  <span className="hover:underline">Logout</span>
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
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-4 rounded shadow-lg text-gray-800">
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
            <span>No Items ...</span>
            ) : 
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-300 py-2">
                <span>{item.title}</span>
                <span>${item.price}</span>
              </div>
            ))
            }
            <div className="mt-4 flex justify-end">
              <button onClick={() => setShowModal(false)} className="text-blue-500 hover:underline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={handleModalClose} message={modalMessage} />
    </nav>
  );
};

export default NavBar;
