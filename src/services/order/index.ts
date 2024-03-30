import { orderRepository,booksRepository,customerRepository } from '../../repositories';

import { buildAddOrder } from './add-order';
import { buildListOrder } from './list-order';
import { buildCancelOrder } from './cancel-order';

export const listOrder = buildListOrder({ orderRepository: orderRepository });
export const addOrder = buildAddOrder({ orderRepository: orderRepository, customerRepository: customerRepository, booksRepository: booksRepository });
export const cancelOrder = buildCancelOrder({ orderRepository: orderRepository, customerRepository: customerRepository, booksRepository: booksRepository });