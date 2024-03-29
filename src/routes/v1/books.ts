import { Router } from 'express';
import { getBooks, postBooks,getBook } from '../../../src/controllers/books';
import { buildExpressCallback } from '../../../src/helpers/express-callback';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */

/**
 * @swagger
 * /v1/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books.
 *     tags: [Books]
 *     responses:
 *       '200':
 *         description: A list of books.
 */
router.get('/', buildExpressCallback(getBooks));

/**
 * @swagger
 * /v1/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieve a book by its ID.
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A book object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 */
router.get('/:id', buildExpressCallback(getBook));



/**
 * @swagger
 * /v1/books:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book entry.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the book.
 *               title:
 *                 type: string
 *                 description: The title of the book.
 *               writer:
 *                 type: string
 *                 description: The writer of the book.
 *               cover_image:
 *                 type: string
 *                 description: The URL of the cover image of the book.
 *               price:
 *                 type: number
 *                 description: The price of the book.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The tags associated with the book.
 *     responses:
 *       '200':
 *         description: Book created successfully.
 */
router.post('/', buildExpressCallback(postBooks));

export default router;
