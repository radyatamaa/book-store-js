import { db } from '../db';

import { buildBooksRepository } from './books/booksRepository';
import { buildCustomerRepository } from './customer/customerRepository';
import { buildOrderRepository } from './order/orderRepository';

export const booksRepository = buildBooksRepository({ db: db.models.Book! });
export const customerRepository = buildCustomerRepository({ db: db.models.Customer! });
export const orderRepository = buildOrderRepository({ db: db.models.Order! });

