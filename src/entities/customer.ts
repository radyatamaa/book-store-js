import { DataTypes, Model, Sequelize } from 'sequelize';
export interface ICustomerEntityAttributes {
    id?: number;
    name: string;
    points: number;
}

export const buildCustomerEntity = (sequelize: Sequelize, name: string) => {
    class Customer extends Model {}

    Customer.init(
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
            points: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 100,
            },
        },
        {
            sequelize,
            modelName: name,
        },
    );

    return Customer;
};