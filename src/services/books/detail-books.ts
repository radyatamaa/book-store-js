import { IBooksRepository } from '../../repositories/books/booksRepository';

export type IDetailBooks = (id: number) => Promise<any>;

export const buildDetailBooks = ({
	BooksRepository,
}: {
	BooksRepository: IBooksRepository;
}): IDetailBooks => {
	return async id => {
		return BooksRepository.findById(id);
	};
};
