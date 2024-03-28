import { DB } from '~/db';
import { buildBooksRepository, IBooksRepository } from './booksRepository';

describe('repositories:books', () => {
	let db: DB;
	let BooksRepository: IBooksRepository;

	beforeEach(async () => {
		db = new DB();
		await db.init({ willLoadFixtures: false });
		BooksRepository = buildBooksRepository({ db: db.models.Book! });
	});

	afterEach(async () => {
		await db.clearTable({ name: 'Book' });
	});

	afterAll(async () => {
		await db.stop();
	});

	describe('findAll', () => {
		it('returns books when no parameters are given', async () => {
			await BooksRepository.create({
				name: 'book1',
			});

			const books = await BooksRepository.findAll();

			expect(books).toHaveLength(1);
		});
	});

	describe('create', () => {
		it('returns created book when valid data is given', async () => {
			const book = await BooksRepository.create({
				name: 'book1',
			});

			expect(book).not.toBeEmpty();
		});
	});
});
