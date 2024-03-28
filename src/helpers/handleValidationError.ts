import { ValidationErrorItem } from '@hapi/joi';
import { ClientError } from '../../src/errors/clientError';

export const handleValidationError = ([validationError]: ValidationErrorItem[]) => {
  switch (validationError.type) {
    case 'object.allowUnknown': {
      throw new ClientError('The request contains an unknown field.');
    }

    case 'object.child': {
      // just show the first validation error only
      const { type, context } = validationError.context!.reason[0];

      switch (type) {
        case 'any.empty':
          throw new ClientError(`${context.label} is empty.`);

        case 'any.required':
          throw new ClientError(`${context.label} is required.`);

        case 'string.min':
          throw new ClientError(`${context.label} must be at least ${context.limit} characters.`);

        case 'string.max':
          throw new ClientError(`${context.label} can be up to ${context.limit} characters.`);

        /**
         * All possible error messages:
         * https://github.com/hapijs/joi/blob/v15.0.1/lib/language.js
         */
        default:
          throw new Error('Unhandled validation error.');
      }
    }

    default:
      throw new Error('Unhandled validation error.');
  }
};
