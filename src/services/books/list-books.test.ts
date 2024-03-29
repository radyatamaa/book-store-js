import { buildBooksRepository, IBooksRepository } from '~/repositories/books/booksRepository';
import { DB } from '~/db';
import { buildListBooks, IListBooks } from './list-books';

describe('list-books', () => {
	let db: DB;
	let BooksRepository: IBooksRepository;
	let listBooks: IListBooks;

	beforeEach(async () => {
		db = new DB();
		await db.init({ willLoadFixtures: false });
		BooksRepository = buildBooksRepository({ db: db.models.Book! });
		listBooks = buildListBooks({ BooksRepository });
	});

	afterEach(async () => {
		await db.clearTable({ name: 'Book' });
	});

	afterAll(async () => {
		await db.stop();
	});

	it('returns books when no parameters are given', async () => {
		await BooksRepository.create({ description: 'book1 ' });
		const books = await listBooks();

		expect(books).toHaveLength(1);
	});
});
