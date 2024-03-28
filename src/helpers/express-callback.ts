import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR,OK } from 'http-status-codes';
import { Controller, IControllerResponse } from '../../src/controllers';

import { ClientError } from '../../src/errors/clientError';
import { logger } from './logger';

export interface IHttpRequest {
	body: Request['body'];
	query: Request['query'];
	params: Request['params'];
}

export const buildExpressCallback = (controller: Controller) => {
	return async (req: Request, res: Response) => {
		try {
			const httpRequest = {
				body: req.body,
				query: req.query,
				params: req.params,
			};
			const httpResponse: IControllerResponse = await controller(httpRequest);
			
			res.json({
				success: true,
				statusCode: OK,
				data: httpResponse.body,
				error: null,
			});

		} catch (error) {
			logger.log(error);

			const statusCode = error instanceof ClientError ? error.status : INTERNAL_SERVER_ERROR
			const errorMessage =
				error instanceof ClientError ? error.message : 'Internal Server Error.';

			res.json({
				success: false,
				statusCode: statusCode,
				data: null,
				error: {
					message: errorMessage,
				},
			});
		}
	};
};
