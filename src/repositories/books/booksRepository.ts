import { ModelInstance } from '../../db';
import { IBookEntityAttributes } from '../../entities/book';
import { Model,Op } from 'sequelize';

export interface IBooksRepository {
    findAll: () => Promise<Model<IBookEntityAttributes>[]>;
    findById: (id: number) =>  Promise<Model<IBookEntityAttributes> | null>;
    create: (data: IBookEntityAttributes) => Promise<Model<IBookEntityAttributes>>;
    findWithPagination: (page: number, limit: number,searchQuery: string) => Promise<{ rows: Model<IBookEntityAttributes>[], count: number }>;
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

    const findWithPagination = async (page: number, limit: number, searchQuery: string) => {
        const offset = (page - 1) * limit;
        let args = { 
            offset, 
            limit 
        } as any
        if (searchQuery) {
            args.where =  {
                title: {
                  [Op.iLike]: `%${searchQuery}%`
                }
              }
        }
        const { rows, count } = await db.findAndCountAll(args);
        return { rows, count };
    };

    return {
        findAll,
        findById,
        create,
        findWithPagination,
    };
};

