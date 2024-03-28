import { OK } from 'http-status-codes';
import { IHttpRequest } from '../../helpers/express-callback';
import { IAddOrder } from '../../services/order/add-order';

import { IControllerResponse } from '..';

export const buildPostOrder = ({ addOrder }: { addOrder: IAddOrder }) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const book = await addOrder(request.body);

		return {
			success: true,
			statusCode: OK,
			body: book,
		};
	};
};
