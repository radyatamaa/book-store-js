import { ModelInstance } from '../../db';
import { IBookEntityAttributes } from '../../entities/book';

export interface IBooksRepository {
    findAll: () => Promise<ModelInstance[]>;
    findById: (id: number) => Promise<ModelInstance | null>;
    create: (data: IBookEntityAttributes) => Promise<ModelInstance>;
    findWithPagination: (page: number, limit: number) => Promise<{ rows: ModelInstance[], count: number }>;
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

    const findWithPagination = async (page: number, limit: number) => {
        const offset = (page - 1) * limit;
        const { rows, count } = await db.findAndCountAll({ offset, limit });
        return { rows, count };
    };

    return {
        findAll,
        findById,
        create,
        findWithPagination,
    };
};

