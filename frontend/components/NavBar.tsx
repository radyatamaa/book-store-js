import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HomeIcon, ShoppingCartIcon, LoginIcon, StarIcon, CashIcon,ArchiveIcon } from '@heroicons/react/solid';
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

      const res = await axios.get<CustomerDetailResponse>(`${process.env.BASE_URL_API}/v1/customer/${customer.id}`, {});
  
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
      removeAllCarts();
      window.location.href = '/order';
    }
  };
  const handleCartClick = () => {
    setShowModal(true);
  };

  const calculateTotal = (items: Book[]) => {
    return items.reduce((total, item) => total + item.total_price, 0);
  };

  const createOrders = async (items: Book[]) => {
    setLoading(true);
    try {   
      const customer = await getCustomerProfile();

      for (let i = 0; i < items.length; i++) {
          const res = await axios.post<CreateOrderResponse>(`${process.env.BASE_URL_API}/v1/order`,
          {
            bookId: items[i].id, 
            quantity: items[i].qty, 
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
      createOrders(cartItems);
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
  <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
    <h1 className="text-2xl font-bold mb-2 md:mb-0">Book Store</h1>
    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
      <li>
        <Link href="/" passHref>
          <div className="flex items-center space-x-2 cursor-pointer">
            <HomeIcon className="w-4 h-4" />
            <span className="hover:underline">Home</span>
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
              <span> {getCustomerPoints()} Point</span>
            </div>
          </li>
          <li>
            <Link href="/order" passHref>
              <div className="flex items-center space-x-2 cursor-pointer">
                <ArchiveIcon className="w-4 h-4" />
                <span className="hover:underline">Orders</span>
              </div>
            </Link>
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
              <span className="hover:underline">Log in / Sign Up</span>
            </div>
          </Link>
        </li>
      )}
    </ul>
  </div>
  {showModal && (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg text-gray-800" style={{ maxWidth: '600px', maxHeight: '40vh', width: '90%', height: '90%' }}>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <span>No Items ...</span>
        ) : (
          <div className="overflow-x-auto" style={{ maxHeight: 'calc(100% - 100px)' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-4 text-left">Item</th>
                  <th className="py-2 px-4 text-left">Qty</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4"></th> {/* Empty header for the delete button column */}
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-2 px-4">{item.title}</td>
                    <td className="py-2 px-4">{item.qty}</td>
                    <td className="py-2 px-4">${item.total_price}</td>
                    <td className="py-2 px-4">
                      <button onClick={() => handleDeleteItem(item)} className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-300">
                  <td colSpan={2} className="py-2 px-4 font-bold">Total</td>
                  <td colSpan={2} className="py-2 px-4 font-bold text-right">${calculateTotal(cartItems)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button onClick={() => setShowModal(false)} className="text-blue-500 hover:underline">
            Close
          </button>
          {cartItems.length > 0 && (
            <button onClick={handleOrder} className="bg-blue-500 text-white px-4 py-2 rounded ml-4">
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
