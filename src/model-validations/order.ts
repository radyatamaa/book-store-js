import Joi from '@hapi/joi';
import { ClientError } from '../../src/errors/clientError';
import { handleValidationError } from '../../src/helpers/handleValidationError';
import { IOrderEntityAttributes } from '../entities/order';

export const validateOrder = (data: IOrderEntityAttributes) => {
	const schema = Joi.object()
		.keys({
			// name: Joi.string()
			// 	.required()
			// 	.min(1)
			// 	.max(20)
			// 	.label('name'),
			customerId: Joi.number().required(),
			bookId: Joi.number().required(),
			quantity: Joi.number().required(),
			order_date: Joi.date()
		})
		.error(handleValidationError);

	const { error } = Joi.validate(data, schema);

	if (error) {
		throw new ClientError(error.message, 400);
	}

	return data;
};
