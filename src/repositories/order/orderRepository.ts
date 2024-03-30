import { ModelInstance } from '../../db';
import { IOrderEntityAttributes } from '../../entities/order';
import { Model } from 'sequelize';

export interface IOrderRepository {
    findAll: () => Promise<Model<IOrderEntityAttributes>[]>;
    findById: (id: number) =>  Promise<Model<IOrderEntityAttributes> | null>;
	create: (data: IOrderEntityAttributes) => Promise<Model<IOrderEntityAttributes>>;
	findWithPagination: (page: number, limit: number,customerId: number) => Promise<{ rows: Model<IOrderEntityAttributes>[], count: number }>;
    deleteData: (id: number) => Promise<number>;
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

	const findWithPagination = async (page: number, limit: number, customerId:number) => {
        const offset = (page - 1) * limit;
        const { rows, count } = await db.findAndCountAll({ where: { customerId },offset, limit });
        return { rows, count };
    };

    const deleteData = async (id: number) => {
		return db.destroy({ where: { id } });
	};

	return {
		findAll,
        findById,
		create,
		findWithPagination,
        deleteData
	};
};
