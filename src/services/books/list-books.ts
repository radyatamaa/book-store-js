import { IBooksRepository } from '../../repositories/books/booksRepository';

export type IListBooks = () => Promise<any>;

export const buildListBooks = ({
	BooksRepository,
}: {
	BooksRepository: IBooksRepository;
}): IListBooks => {
	return async () => {
		return BooksRepository.findAll();
	};
};
