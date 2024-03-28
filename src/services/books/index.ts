import { booksRepository } from '../../repositories';

import { buildAddBooks } from './add-books';
import { buildListBooks } from './list-books';

export const listBooks = buildListBooks({ BooksRepository: booksRepository });
export const addBooks = buildAddBooks({ BooksRepository: booksRepository });
