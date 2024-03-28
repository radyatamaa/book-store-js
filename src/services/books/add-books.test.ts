import { buildBooksRepository } from '~/repositories/books/booksRepository';
import { DB } from '~/db';

import { ClientError } from '~/errors/clientError';
import { buildAddBooks, IAddBooks } from './add-books';

describe('add-books', () => {
	let db: DB;
	let BooksRepository;
	let addBooks: IAddBooks;

	beforeEach(async () => {
		db = new DB();
		await db.init({ willLoadFixtures: false });
		BooksRepository = buildBooksRepository({ db: db.models.Book! });
		addBooks = buildAddBooks({ BooksRepository });
	});

	afterEach(async () => {
		await db.clearTable({ name: 'Book' });
	});

	afterAll(async () => {
		await db.stop();
	});

	it('returns added book when valid data is given', async () => {
		const book = await addBooks({ name: 'book1' });

		expect(book).not.toBeEmpty();
	});

	it('throws error when invalid data is given', async () => {
		try {
			const invalidName = '';

			await addBooks({ name: invalidName });
		} catch (error) {
			expect(error).toBeInstanceOf(ClientError);
		}
	});
});
