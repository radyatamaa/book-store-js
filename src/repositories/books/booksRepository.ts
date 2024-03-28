import { ModelInstance } from '../../db';
import { IBookEntityAttributes } from '../../entities/book';

export interface IBooksRepository {
	findAll: () => Promise<ModelInstance[]>;
	findById: (id: number) => Promise<ModelInstance | null>;
	create: (data: IBookEntityAttributes) => Promise<ModelInstance>;
}

export const buildBooksRepository = ({
	db,
}: {
	db: typeof ModelInstance;
}): IBooksRepository => {
	const findAll = async () => {
		return db.findAll();
	};

	const findById = async (id: number) => {
		return db.findByPk(id);
	};

	const create = async (data: IBookEntityAttributes) => {
		return db.create(data);
	};

	return {
		findAll,
		findById,
		create,
	};
};
