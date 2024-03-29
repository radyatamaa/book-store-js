import { booksRepository } from '../../repositories';

import { buildAddBooks } from './add-books';
import { buildListBooks } from './list-books';
import { buildDetailBooks } from './detail-books';

export const listBooks = buildListBooks({ BooksRepository: booksRepository });
export const addBooks = buildAddBooks({ BooksRepository: booksRepository });
export const detailBooks = buildDetailBooks({ BooksRepository: booksRepository });