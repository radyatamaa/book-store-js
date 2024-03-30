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
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMoreBooks = async (searchQuery: string) => {
    setLoading(true);
    try {
      const res = await axios.get<BookResponse>(`${process.env.BASE_URL_API}/v1/books`, {
        params: { page: page + 1, limit: 9, search: searchQuery },
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

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axios.get<BookResponse>(`${process.env.BASE_URL_API}/v1/books`, {
        params: { page: 1, limit: 9, search: searchQuery },
      });
      const newBooks = res.data.data.rows;
      setBooks(newBooks);
      setPage(1); // Reset page to 1 when new search is performed
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight * 0.8 && !loading) {
        fetchMoreBooks(searchQuery);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, searchQuery]);

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold my-8">Welcome these are list of books</h1>
        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-md">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title..."
              className="border border-gray-300 rounded-l px-3 py-2 w-full"
            />
          </div>
        </div>
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
  const res = await axios.get<BookResponse>(`${process.env.BASE_URL_API}/v1/books`, {
    params: { page: 1, limit: 9 }, 
  });
  const books = res.data.data.rows;

  return {
    props: {
      books,
    },
  };
}

export default Home;
