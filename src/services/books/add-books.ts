import { IBooksRepository } from '../../repositories/books/booksRepository';
import { validateBook } from '../../model-validations/book';
import { IBookEntityAttributes } from '../../entities/book';

export type IAddBooks = (body: IBookEntityAttributes) => Promise<any>;

export const buildAddBooks = ({
	BooksRepository,
}: {
	BooksRepository: IBooksRepository;
}): IAddBooks => {
	return async body => {
		const bookData = validateBook(body);
		return BooksRepository.create({
			description: bookData.description,
			title: bookData.title,
			writer: bookData.writer,
			cover_image: bookData.cover_image,
			price: bookData.price,
			tags: bookData.tags
		});
	};
};
