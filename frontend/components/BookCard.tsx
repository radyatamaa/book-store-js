import { Book } from '../types/book';
import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { useCart } from '../contexts/CartContext';

interface Props {
  book: Book;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartCount, setCartCount] = useState(0); 
  const { addToCart } = useCart();
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    setShowModal(true);
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem('customerLogin')) {
      router.push('/login'); 
      return;
    }
    addToCart(book); 
    setShowModal(false);
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
          <div className="bg-white p-4 rounded shadow-lg max-w-sm">
            <div className="flex justify-center">
              <img src={book.cover_image} alt={book.title} className="object-cover max-h-full" />
            </div>
            <div className="mt-4">
              <p className="font-bold">{book.title}</p>
              <p>{book.description}</p>
              <p className="text-gray-800 font-bold mt-2">${book.price}</p>
              <div className="flex justify-end mt-4">
                <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Add to Cart
                </button>
                <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
