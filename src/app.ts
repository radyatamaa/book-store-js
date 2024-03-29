import bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import { db } from '../src/db';
import { logger } from '../src/helpers/logger';
import apiV1 from '../src/routes/v1';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

class Server {
	app = express();
	port = 3000 || config.get('port');

	applyMiddlewares() {
		this.app.use(cors({
  		origin: 'http://localhost:3001', // Allow requests from this origin
  			optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
		}));
		this.app.use(bodyParser.json());
		this.app.use('/v1', apiV1);
	}

	swagger() {
		// Swagger definition
		const options: swaggerJsdoc.Options = {
			definition: {
			openapi: '3.0.0',
			info: {
				title: 'Express API with Swagger',
				version: '1.0.0',
				description: 'This is a sample server using Express and Swagger'
			},
			servers: [
				{
				url: 'http://localhost:3000'
				}
			]
			},
			// Path to the API docs
			apis: ['./src/routes/v1/*.ts'] // Path to the API routes files
		};
		
		// Initialize swagger-jsdoc
		const swaggerSpec = swaggerJsdoc(options);

		// Serve Swagger docs
		this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	}
	start() {
		this.applyMiddlewares();
		this.swagger();


		this.app.listen(this.port, async () => {
			logger.log(`listening to port:${this.port}`);
			await db.init({ willLoadFixtures: true });
		});
	}
}

export const server = new Server();
