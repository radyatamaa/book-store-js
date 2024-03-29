import { ModelInstance } from '../../db';
import { ICustomerEntityAttributes } from '../../entities/customer';
import { Model } from 'sequelize';

export interface ICustomerRepository {
	findAll: () => Promise<Model<ICustomerEntityAttributes>[]>;
    findById: (id: number) => Promise<Model<ICustomerEntityAttributes> | null>;
	create: (data: ICustomerEntityAttributes) =>Promise<Model<ICustomerEntityAttributes>>;
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
