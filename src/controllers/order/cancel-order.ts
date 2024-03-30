import { OK } from 'http-status-codes';
import { IHttpRequest } from '../../helpers/express-callback';
import { ICancelOrder } from '../../services/order/cancel-order';

import { IControllerResponse } from '..';

export const buildCancelOrder = ({ cancelOrder }: { cancelOrder: ICancelOrder }) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const book = await cancelOrder(request.params.id);

		return {
			success: true,
			statusCode: OK,
			body: book,
		};
	};
};
