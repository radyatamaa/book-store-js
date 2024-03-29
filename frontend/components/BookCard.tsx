import React from 'react';
import { Book } from '../types/book';

interface Props {
  book: Book;
}

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between">
      <div className="w-full h-48 flex items-center justify-center overflow-hidden">
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
  );
};

export default BookCard;
