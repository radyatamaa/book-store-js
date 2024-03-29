import { OK } from 'http-status-codes';
import { IHttpRequest } from '../../../src/helpers/express-callback';
import { IDetailBooks } from '../../services/books/detail-books';

import { IControllerResponse } from '..';

export const buildGetBook = ({ detailBooks }: { detailBooks: IDetailBooks }) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const book = await detailBooks(request.params.id);

		return {
			success: true,
			statusCode: OK,
			body: book,
		};
	};
};
