import Joi from '@hapi/joi';
import { ClientError } from '../../src/errors/clientError';
import { handleValidationError } from '../../src/helpers/handleValidationError';
import { ICustomerEntityAttributes } from '../entities/customer';

export const validateCustomer = (data: ICustomerEntityAttributes) => {
	const schema = Joi.object()
		.keys({
			name: Joi.string()
				.required()
				.min(1)
				.max(20)
				.label('name'),
		})
		.error(handleValidationError);

	const { error } = Joi.validate(data, schema);

	if (error) {
		throw new ClientError(error.message, 400);
	}

	return data;
};
