import { Book } from '../types/book';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from Next.js


interface Props {
  book: Book;
  onAddToCart: () => void;
}
const BookCard: React.FC<Props> = ({ book, onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    setShowModal(true);
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem('customerType')) {
      router.push('/login'); // Redirect ke halaman login jika belum login
      return;
    }
    onAddToCart(); // Lakukan logika penambahan item ke keranjang jika sudah login
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
        <div
          className="w-full h-48 flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={handleClick}
        >
          <img src={book.cover_image} alt={book.title} className="object-cover max-h-full" />
        </div>

        <div className="p-4">
          <h3 className="text-xl font-bold">{book.title}</h3>
          <p className="text-gray-600">{book.writer}</p>
          <p className="text-gray-800 font-bold mt-2">${book.price}</p>
          <div className="flex mt-4">
            {book.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <img src={book.cover_image} alt={book.title} className="object-cover max-h-full" />
            <p className="font-bold">{book.title}</p>
            <p>{book.description}</p>
            <p className="text-gray-800 font-bold mt-2">${book.price}</p>
            <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
              Add to Cart
            </button>
            <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 mt-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
