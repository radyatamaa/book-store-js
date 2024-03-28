import { Router } from 'express';
import { getOrder, postOrder } from '../../controllers/order';
import { buildExpressCallback } from '../../helpers/express-callback';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints for managing order
 */

/**
 * @swagger
 * /v1/order:
 *   get:
 *     summary: Get all order
 *     description: Retrieve a list of all order.
 *     tags: [Order]
 *     responses:
 *       '200':
 *         description: A list of order.
 */
router.get('/', buildExpressCallback(getOrder));

/**
 * @swagger
 * /v1/order:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order entry.
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: number
 *                 description: The ID of the customer placing the order.
 *               bookId:
 *                 type: number
 *                 description: The ID of the book being ordered.
 *               quantity:
 *                 type: number
 *                 description: The quantity of the book being ordered.
 *     responses:
 *       '200':
 *         description: Book created successfully.
 */
router.post('/', buildExpressCallback(postOrder));

export default router;