// pages/index.tsx
import React from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import NavBar from '../components/NavBar';
import { BookResponse,Book } from '../types/book';

interface Props {
  books: Book[];
}

const Home: React.FC<Props> = ({ books }) => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold my-8">Best Seller</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold my-8">News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await axios.get<BookResponse>('http://localhost:3000/v1/books');
  const books = res.data.data;

  return {
    props: {
      books,
    },
  };
}

export default Home;
