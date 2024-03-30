import { OK } from 'http-status-codes';
import { IHttpRequest } from '../../helpers/express-callback';
import { IListCustomer } from '../../services/customer/list-customer';

import { IControllerResponse } from '..';

export const buildGetCustomers = ({ listCustomer }: { listCustomer: IListCustomer }) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const customer = await listCustomer();

		return {
			success: true,
			statusCode: OK,
			body: customer,
		};
	};
};
