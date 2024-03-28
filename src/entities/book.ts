import { DataTypes, Model, Sequelize } from 'sequelize';

export interface IBookEntityAttributes {
	name: string;
	title: string;
    writer: string;
    cover_image: string;
    price: number;
    tags: string[];
}

export const buildBookEntity = (sequelize: Sequelize, name: string) => {
	class Book extends Model {}

	Book.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            writer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cover_image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            tags: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: name,
        },
    );

	return Book;
};
