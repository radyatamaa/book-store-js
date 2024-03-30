import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HomeIcon, ShoppingCartIcon, LoginIcon, StarIcon, CashIcon } from '@heroicons/react/solid';
import { useCart } from '../contexts/CartContext';
import Modal from '../components/Modal';
import { useRouter } from 'next/router';
import { Book } from '../types/book';
import { CreateOrderRequest,CreateOrderResponse } from '../types/order';
import { Customer,CustomerDetailResponse } from '../types/customer';
import axios from 'axios';

const NavBar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const { cartItems, removeAllCarts,removeFromCart  } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ message: '', status: '' });
  const router = useRouter();

  useEffect(() => {
    const customerLogin = localStorage.getItem('customerLogin');
    setIsLoggedIn(!!customerLogin);
    getCustomerProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerLogin');
    localStorage.removeItem('cartItems');
    setIsLoggedIn(false);
    setModalMessage({ message: 'Logout success', status: 'success' });
    setModalOpen(true);
   
  };

  const getCustomerPoints = () => {
    const customerData = localStorage.getItem('customerLogin');
    
    if (customerData && customerData !== null && customerData !== 'null') {
      getCustomerProfile();
      let customer = JSON.parse(customerData) as Customer;

      const { points } = customer;
      return points;
    }
    return 0; // Default value if customerData is not found
  };

  const getCustomerProfile = async () => {
    const customerData = localStorage.getItem('customerLogin');
    if (customerData && customerData !== null && customerData !== 'null') {
      console.log('customerData',customerData);
      const customer = JSON.parse(customerData) as Customer;

      const res = await axios.get<CustomerDetailResponse>(`http://localhost:3000/v1/customer/${customer.id}`, {});
  
      localStorage.setItem('customerLogin',JSON.stringify(res.data.data));

      return res.data.data;
    }
    return null; // Default value if customerData is not found
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (modalMessage.status === 'success') {
      window.location.href = '/';
    }
    if (isOrder) {
      cartItems.map((item, index) => {
          createOrder(item);
      });
      removeAllCarts();
      window.location.href = '/';
    }
  };
  const handleCartClick = () => {
    setShowModal(true);
  };

  const calculateTotal = (items: Book[]) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const createOrder = async (item: Book) => {
    setLoading(true);
    try {   
      const customer = await getCustomerProfile();

      const res = await axios.post<CreateOrderResponse>('http://localhost:3000/v1/order',
        {
          bookId: item.id, 
          quantity: 1, 
          customerId: customer?.id
        } as CreateOrderRequest, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });

      if (res.data.error) {
        setModalMessage({ message: res.data.error.message, status: 'failed' });
        setModalOpen(true);
        setIsOrder(false);
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    }
    setLoading(false);
  };

  const handleOrder = () => {
    const points = getCustomerPoints();
    if (calculateTotal(cartItems) > points) {
      setModalMessage({ message: 'Your points are not enough to order', status: 'failed' });
      setModalOpen(true);
      setIsOrder(false);
    } else {
      setModalMessage({ message: 'Order success', status: 'success' });
      setModalOpen(true);
      setIsOrder(true);
    }
    // Close the modal
    setShowModal(false);
  };
  
  const handleDeleteItem = (book: Book) => {
    removeFromCart(book);
  }
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
                <div className="flex items-center space-x-2">
                  <CashIcon className="w-4 h-4" />
                  <span>Point {getCustomerPoints()}</span>
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
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-2">Item</th>
                    <th className="py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="py-2">{item.title}</td>
                      <td className="py-2">${item.price}</td>
                      <td className="py-2">
                        <button onClick={() => handleDeleteItem(item)} className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-300">
                    <td className="py-2 font-bold">Total</td>
                    <td className="py-2 font-bold">${calculateTotal(cartItems)}</td>
                  </tr>
                </tfoot>
              </table>
            )}
            <div className="mt-4 flex justify-between">
              <button onClick={() => setShowModal(false)} className="text-blue-500 hover:underline">
                Close
              </button>
              {cartItems.length > 0 && (
              <button onClick={handleOrder} className="bg-blue-500 text-white px-4 py-2 rounded">
                Order Now
              </button>
              )}
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={handleModalClose} message={modalMessage} />
    </nav>
  );
};

export default NavBar;
