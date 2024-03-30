import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListOrderResponse, ListOrder } from '../types/order';
import Modal from '../components/Modal';
import NavBar from '../components/NavBar'; // Sesuaikan dengan lokasi komponen NavBar Anda

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<ListOrder[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<ListOrderResponse>('http://localhost:3000/v1/orders');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await axios.delete(`http://localhost:3000/v1/orders/${orderId}`);
      // Refresh the orders list after deletion
      const updatedOrders = orders.filter(order => order.id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error('Failed to delete order:', error);
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
          <table className="w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Book Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  {/* <td>{order.customer.name}</td> */}
                  <td>{order.book.title}</td>
                  <td>
                    <button onClick={() => setShowModal(true)} className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showModal && <Modal isOpen={showModal} onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
};

export default OrderListPage;
