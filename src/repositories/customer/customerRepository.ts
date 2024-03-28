import { ModelInstance } from '../../db';
import { ICustomerEntityAttributes } from '../../entities/customer';

export interface ICustomerRepository {
	findAll: () => Promise<ModelInstance[]>;
    findById: (id: number) => Promise<ModelInstance | null>;
	create: (data: ICustomerEntityAttributes) => Promise<ModelInstance>;
}

export const buildCustomerRepository = ({
	db,
}: {
	db: typeof ModelInstance;
}): ICustomerRepository => {
	const findAll = async () => {
		return db.findAll();
	};

    const findById = async (id: number) => {
		return db.findByPk(id);
	};

	const create = async (data: ICustomerEntityAttributes) => {
		return db.create(data);
	};

	return {
		findAll,
        findById,
		create,
	};
};
