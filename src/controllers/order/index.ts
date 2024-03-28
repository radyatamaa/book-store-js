import { addOrder, listOrder } from '../../services/order';

import { buildGetOrder } from './get-orders';
import { buildPostOrder } from './post-order';

export const getOrder = buildGetOrder({ listOrder });
export const postOrder = buildPostOrder({ addOrder });
