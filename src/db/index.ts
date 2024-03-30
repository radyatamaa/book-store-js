import { Model, Sequelize, Options } from 'sequelize';
import sequelizeFixtures from 'sequelize-fixtures';
import { logger } from '../../src/helpers/logger';
import { buildBookEntity } from '../entities/book';
import { buildCustomerEntity } from '../entities/customer';
import { buildOrderEntity } from '../entities/order';
import { dbConn } from '../config';

// Generic sequelize instance type
export class ModelInstance extends Model {}

interface IModelBuilder {
	name: string;
	builder: (sequelize: Sequelize, name: string) => typeof ModelInstance;
}

// tslint:disable-next-line: max-classes-per-file
export class DB {
	models: Partial<{ [name in string]: typeof ModelInstance }> = {};
	dbConfig = dbConn;
	sequelize = new Sequelize(this.dbConfig);
	modelBuilders: IModelBuilder[] = [
		{
			name: 'Book',
			builder: buildBookEntity,
		},
		{
			name: 'Customer',
			builder: buildCustomerEntity,
		},
		{
			name: 'Order',
			builder: buildOrderEntity,
		},
	];

	constructor() {
		this.addModels();
	}

	addModels() {
		this.modelBuilders.forEach(({ name, builder }) => {
			const model = builder(this.sequelize, name);
			this.models[name] = model;
		});
	}

	loadFixtures() {
		sequelizeFixtures.loadFile('src/db/fixtures/books.json', this.models);
		sequelizeFixtures.loadFile('src/db/fixtures/customers.json', this.models);
	}

	async clearTable({ name }: { name: string }) {
		if (!this.models[name]) {
			throw new Error('no such table!');
		}

		await this.models[name]!.destroy({
			where: {},
			truncate: true,
		});
	}

	async stop() {
		return this.sequelize.close();
	}

	async init({ willLoadFixtures = true }: { willLoadFixtures: boolean }) {
		const isDev = process.env.NODE_ENV === 'development';

		try {
			await this.sequelize.authenticate();
			console.log('Connection has been established successfully.');

			await this.sequelize.sync({
				force: isDev,
			});

			if (willLoadFixtures) {
				this.loadFixtures();
			}

			if (isDev) {
				logger.log('db is connected');
			}
		} catch (error) {
			if (isDev) {
				logger.log(error);
			}
		}
	}
}

export const db = new DB();
