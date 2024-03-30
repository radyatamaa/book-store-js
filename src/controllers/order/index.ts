import { addOrder, listOrder, cancelOrder } from '../../services/order';

import { buildGetOrder } from './get-orders';
import { buildPostOrder } from './post-order';
import { buildCancelOrder } from './cancel-order';

export const getOrder = buildGetOrder({ listOrder });
export const postOrder = buildPostOrder({ addOrder });
export const deleteOrder = buildCancelOrder({ cancelOrder });