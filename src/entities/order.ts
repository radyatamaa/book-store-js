import { DataTypes, Model, Sequelize } from 'sequelize';

export interface IOrderEntityAttributes {
    id?: number;
    customerId: number;
    bookId: number;
    quantity: number;
    order_date: Date;
    book_data: string;
}

export const buildOrderEntity = (sequelize: Sequelize, name: string) => {
    class Order extends Model {}

    Order.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            customerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bookId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            book_data: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            order_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            sequelize,
            modelName: name,
        },
    );

    return Order;
};
