import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListOrderResponse, ListOrder } from '../types/order';
import Modal from '../components/Modal';
import NavBar from '../components/NavBar';
import { Customer, CustomerDetailResponse } from '../types/customer';

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<ListOrder[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ message: '', status: '' });
  const [page, setPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Items per page

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const customer = await getCustomerProfile();
        const response = await axios.get<ListOrderResponse>('http://localhost:3000/v1/order', {
          params: {
            page,
            limit: pageSize,
            customerId: customer?.id
          },
        });
        setOrders(response.data.data.rows);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, [page, pageSize]); // Fetch orders when page or pageSize changes

  const getCustomerProfile = async () => {
    const customerData = localStorage.getItem('customerLogin');
    if (customerData && customerData !== null && customerData !== 'null') {
      const customer = JSON.parse(customerData) as Customer;
      const res = await axios.get<CustomerDetailResponse>(`http://localhost:3000/v1/customer/${customer.id}`, {});
      localStorage.setItem('customerLogin', JSON.stringify(res.data.data));
      return res.data.data;
    }
    return null; // Default value if customerData is not found
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await axios.delete(`http://localhost:3000/v1/order/${orderId}`);
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
      setModalMessage({ message: 'Order has been successfully canceled!', status: 'success' });
      setShowSuccessModal(true);
      await getCustomerProfile();
    } catch (error) {
      console.error('Failed to cancel order:', error);
      setModalMessage({ message: 'Failed to cancel order', status: 'failed' });
      setShowSuccessModal(true);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mt-8 mb-4">List of Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-50 text-left">Order ID</th>
                  <th className="py-2 px-4 bg-gray-50 text-left">Book Title</th>
                  <th className="py-2 px-4 bg-gray-50 text-left">Qty</th>
                  <th className="py-2 px-4 bg-gray-50 text-left">Total Price</th>
                  <th className="py-2 px-4 bg-gray-50 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-gray-200">
                    <td className="py-2 px-4 text-left">{order.id}</td>
                    <td className="py-2 px-4 text-left">{JSON.parse(order.book_data).title}</td>
                    <td className="py-2 px-4 text-left">{order.quantity}</td>
                    <td className="py-2 px-4 text-left">{order.total_price}</td>
                    <td className="py-2 px-4 text-left">
                      <button onClick={() => handleDeleteOrder(order.id)} className="text-red-500 hover:text-red-700">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button onClick={() => setPage(page - 1)} disabled={page === 1} className="bg-gray-200 px-4 py-2 rounded-md" style={{ display: page === 1 ? 'none' : 'block' }}>Previous</button>
              <span className="px-4 py-2">Page {page}</span>
              <button onClick={() => setPage(page + 1)} disabled={orders.length < pageSize} className="bg-gray-200 px-4 py-2 rounded-md" style={{ display: orders.length < pageSize ? 'none' : 'block' }}>Next</button>
            </div>
          </>
        )}
        {showModal && <Modal isOpen={showModal} onClose={() => setShowModal(false)} />}
        {showSuccessModal && (
          <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} message={modalMessage} />
        )}
      </div>
    </>
  );
};

export default OrderListPage;
