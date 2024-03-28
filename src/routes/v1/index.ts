import { Router } from 'express';

import booksApi from './books';
import customerApi from './customer';
import orderApi from './order';

const router = Router();

router.use('/books', booksApi);
router.use('/customer', customerApi);
router.use('/order', orderApi);

export default router;
