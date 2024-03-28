import Joi from '@hapi/joi';
import { ClientError } from '../../src/errors/clientError';
import { handleValidationError } from '../../src/helpers/handleValidationError';
import { IBookEntityAttributes } from '../entities/book';

export const validateBook = (data: IBookEntityAttributes) => {
	const schema = Joi.object()
		.keys({
			name: Joi.string()
				.required()
				.min(1)
				.max(20)
				.label('name'),
				title: Joi.string(),
				writer: Joi.string(),
				cover_image: Joi.string(),
				price: Joi.number(),
				tags: Joi.array()
		})
		.error(handleValidationError);

	const { error } = Joi.validate(data, schema);

	if (error) {
		throw new ClientError(error.message, 400);
	}

	return data;
};
