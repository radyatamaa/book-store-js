import { customerRepository } from '../../repositories';

import { buildAddCustomer } from './add-customer';
import { buildListCustomer } from './list-customer';
import { buildDetailCustomer } from './detail-customer';

export const listCustomer = buildListCustomer({ customerRepository: customerRepository });
export const addCustomer = buildAddCustomer({ customerRepository: customerRepository });
export const detailCustomer = buildDetailCustomer({ customerRepository: customerRepository });