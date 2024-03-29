import { ModelInstance } from '../../db';
import { IOrderEntityAttributes } from '../../entities/order';
import { Model } from 'sequelize';

export interface IOrderRepository {
    findAll: () => Promise<Model<IOrderEntityAttributes>[]>;
    findById: (id: number) =>  Promise<Model<IOrderEntityAttributes> | null>;
	create: (data: IOrderEntityAttributes) => Promise<Model<IOrderEntityAttributes>>;
}

export const buildOrderRepository = ({
	db,
}: {
	db: typeof ModelInstance;
}): IOrderRepository => {
	const findAll = async () => {
		return db.findAll();
	};

    const findById = async (id: number) => {
		return db.findByPk(id);
	};

	const create = async (data: IOrderEntityAttributes) => {
		return db.create(data);
	};

	return {
		findAll,
        findById,
		create,
	};
};
