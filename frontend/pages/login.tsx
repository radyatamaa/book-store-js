// LoginPage.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const [customerType, setCustomerType] = useState('customer');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Lakukan validasi atau panggil API untuk login
      // Contoh sederhana hanya menampilkan data yang diinput
      localStorage.setItem('customerType', customerType); // Simpan customer type ke local storage
      alert(`Customer Type: ${customerType}`);
      // Redirect ke halaman utama setelah login berhasil
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
    setLoading(false);
  };

  const handleNewCustomer = () => {
    // Redirect ke halaman pembuatan akun baru
    router.push('/new-customer');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="customerType" className="block text-gray-700">Customer Type</label>
          <select
            id="customerType"
            className="w-full border rounded px-3 py-2 mt-1"
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
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

export default LoginPage;
