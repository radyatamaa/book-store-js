import { OK } from 'http-status-codes';
import { IHttpRequest } from '../../helpers/express-callback';
import { IAddCustomer } from '../../services/customer/add-customer';

import { IControllerResponse } from '..';

export const buildPostCustomer = ({ addCustomer }: { addCustomer: IAddCustomer }) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const book = await addCustomer(request.body);

		return {
			success: true,
			statusCode: OK,
			body: book,
		};
	};
};
