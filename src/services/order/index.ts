import { orderRepository,booksRepository,customerRepository } from '../../repositories';

import { buildAddOrder } from './add-order';
import { buildListOrder } from './list-order';

export const listOrder = buildListOrder({ orderRepository: orderRepository });
export const addOrder = buildAddOrder({ orderRepository: orderRepository, customerRepository: customerRepository, booksRepository: booksRepository });
