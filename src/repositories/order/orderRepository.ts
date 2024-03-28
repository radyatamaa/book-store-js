import { ModelInstance } from '../../db';
import { IOrderEntityAttributes } from '../../entities/order';

export interface IOrderRepository {
	findAll: () => Promise<ModelInstance[]>;
    findById: (id: number) => Promise<ModelInstance | null>;
	create: (data: IOrderEntityAttributes) => Promise<ModelInstance>;
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
