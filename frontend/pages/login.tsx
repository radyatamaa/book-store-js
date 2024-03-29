// LoginPage.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { CustomerResponse, Customer } from '../types/customer';

interface Props {
  customers: Customer[];
}

const LoginPage: React.FC<Props> = ({ customers: initialCustomers }) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [customerLogin, setCustomerLogin] = useState('customer');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (customerLogin === 'customer' || !customerLogin) {
        alert(`Login failed: please choose the customer`);
      } else {
        // Lakukan validasi atau panggil API untuk login
        // Contoh sederhana hanya menampilkan data yang diinput
        localStorage.setItem('customerLogin', customerLogin); // Simpan customer type ke local storage
        alert(`Login success`);
        // Redirect ke halaman utama setelah login berhasil
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    setLoading(false);
  };

  const handleNewCustomer = async () => {
    const randomInt = Math.floor(Math.random() * (10000 - 1)) + 1;
    const res = await axios.post('http://localhost:3000/v1/customer', {
      name: 'Customer' + randomInt.toString(),
    }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    });

    const customer = res.data.data;
    localStorage.setItem('customerLogin', JSON.stringify(customer)); // Simpan customer type ke local storage
    // Redirect ke halaman pembuatan akun baru

    alert(`Register success`);
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="customerLogin" className="block text-gray-700">Customer</label>
          <select
            id="customerLogin"
            className="w-full border rounded px-3 py-2 mt-1"
            value={customerLogin}
            onChange={(e) => setCustomerLogin(e.target.value)}
          >
            <option value="">--Choose Customer--</option>
            {customers.map((customer, index) => (
              <option key={index} value={JSON.stringify(customer)}>{customer.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded mr-2" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button onClick={handleNewCustomer} className="bg-green-500 text-white px-4 py-2 rounded">
            New Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await axios.get<CustomerResponse>('http://localhost:3000/v1/customer', {
    params: { page: 1, limit: 9 }, // assuming API supports pagination
  });
  const customers = res.data.data;

  return {
    props: {
      customers,
    },
  };
}

export default LoginPage;
