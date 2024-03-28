import { Router } from 'express';
import { getCustomer, postCustomer } from '../../../src/controllers/customer';
import { buildExpressCallback } from '../../../src/helpers/express-callback';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: API endpoints for managing customer
 */

/**
 * @swagger
 * /v1/customer:
 *   get:
 *     summary: Get all customer
 *     description: Retrieve a list of all customer.
 *     tags: [Customer]
 *     responses:
 *       '200':
 *         description: A list of customer.
 */
router.get('/', buildExpressCallback(getCustomer));

/**
 * @swagger
 * /v1/customer:
 *   post:
 *     summary: Create a new customer
 *     description: Create a new customer entry.
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the customer.
 *     responses:
 *       '200':
 *         description: Book created successfully.
 */
router.post('/', buildExpressCallback(postCustomer));

export default router;