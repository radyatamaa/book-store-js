import { Router } from 'express';
import { getOrder, postOrder,deleteOrder } from '../../controllers/order';
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
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         description: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         required: true
 *         description: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: customerId
 *         required: true
 *         description: customerId
 *         schema:
 *           type: number
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

/**
 * @swagger
 * /v1/order/{id}:
 *   delete:
 *     summary: Cancel a order by ID
 *     description: Cancel a order by its ID.
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A order object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 */
router.delete('/:id', buildExpressCallback(deleteOrder));

export default router;