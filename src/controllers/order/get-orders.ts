import { OK } from 'http-status-codes';
import { IHttpRequest } from '../../helpers/express-callback';
import { IListOrder } from '../../services/order/list-order';

import { IControllerResponse } from '..';

export const buildGetOrder = ({ listOrder }: { listOrder: IListOrder }) => {
	return async (
		request: Partial<IHttpRequest>,
	): Promise<IControllerResponse> => {
		const order = await listOrder(request.query);

		return {
			success: true,
			statusCode: OK,
			body: order,
		};
	};
};
