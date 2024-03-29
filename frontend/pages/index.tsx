import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import NavBar from '../components/NavBar';
import { BookResponse, Book } from '../types/book';

interface Props {
  books: Book[];
}

const Home: React.FC<Props> = ({ books: initialBooks }) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [page, setPage] = useState(1);

  const fetchMoreBooks = async () => {
    setLoading(true);
    try {
        const res = await axios.get<BookResponse>('http://localhost:3000/v1/books', {
            params: { page: page + 1, limit: 9 }, // assuming API supports pagination
        });
        const newBooks = res.data.data.rows;
        if (newBooks.length === 0) {
            setLoading(false); // Stop loading
            return; // Exit function early
        }
        setBooks((prevBooks) => [...prevBooks, ...newBooks]);
        setPage((prevPage) => prevPage + 1);
    } catch (error) {
        console.error('Failed to fetch more books:', error);
    }
    setLoading(false);
};

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight * 0.8 && !loading) {
        fetchMoreBooks();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold my-8">News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await axios.get<BookResponse>('http://localhost:3000/v1/books', {
    params: { page: 1, limit: 9 }, // assuming API supports pagination
  });
  const books = res.data.data.rows;

  return {
    props: {
      books,
    },
  };
}

export default Home;
