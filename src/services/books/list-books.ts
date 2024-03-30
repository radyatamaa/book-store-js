import { IBooksRepository } from '../../repositories/books/booksRepository';

export type IListBooks = (query: {page:number,limit: number,search: string}) => Promise<any>;

export const buildListBooks = ({
	BooksRepository,
}: {
	BooksRepository: IBooksRepository;
}): IListBooks => {
	return async (query) => {
		let page = 1;
		let limit = 5;
		if (query.limit > 0) {
			page = query.page
			limit = query.limit
		}
		return BooksRepository.findWithPagination(page,limit,query.search);
	};
};
