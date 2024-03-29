import { addBooks, listBooks,detailBooks } from '../../services/books';

import { buildGetBooks } from './get-books';
import { buildPostBooks } from './post-books';
import { buildGetBook } from './detail-books';

export const getBooks = buildGetBooks({ listBooks });
export const postBooks = buildPostBooks({ addBooks });
export const getBook = buildGetBook({ detailBooks });