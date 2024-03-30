import { OK } from 'http-status-codes';
import { IHttpRequest } from '../../../src/helpers/express-callback';
import { IDetailCustomer } from '../../services/customer/detail-customer';

import { IControllerResponse } from '..';

export const buildGetCustomer = ({ detailCustomer }: { detailCustomer: IDetailCustomer }) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const book = await detailCustomer(request.params.id);

		return {
			success: true,
			statusCode: OK,
			body: book,
		};
	};
};
