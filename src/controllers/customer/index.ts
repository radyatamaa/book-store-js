import { addCustomer, listCustomer } from '../../services/customer';

import { buildGetCustomer } from './get-customers';
import { buildPostCustomer } from './post-customer';

export const getCustomer = buildGetCustomer({ listCustomer });
export const postCustomer = buildPostCustomer({ addCustomer });
