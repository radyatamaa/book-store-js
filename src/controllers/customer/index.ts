import { addCustomer, listCustomer,detailCustomer } from '../../services/customer';

import { buildGetCustomers } from './get-customers';
import { buildGetCustomer } from './detail-customer';
import { buildPostCustomer } from './post-customer';

export const getCustomers = buildGetCustomers({ listCustomer });
export const getCustomer = buildGetCustomer({ detailCustomer });
export const postCustomer = buildPostCustomer({ addCustomer });
