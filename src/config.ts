import { Options } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();


interface App {
    app_env: string;
	port: number;
    host: string;
    allowCorsOrigin: string;
}

export const dbConn: Options = {
    database: process.env.DB_DATABASE || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    dialect: (process.env.DB_DIALECT as Options['dialect']) || 'postgres', // Default to 'postgres'
    pool: {
        max: parseInt(process.env.DB_POOL_MAX || '5', 10),
        min: parseInt(process.env.DB_POOL_MIN || '0', 10),
        idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10),
    },
    logging: process.env.DB_LOGGING === 'true',
    define: {
        freezeTableName: process.env.DB_DEFINE_FREEZE_TABLE_NAME === 'true',
    },
    dialectOptions: {
        ssl: {
            require: process.env.DB_SSL_REQUIRED === 'true', // This will help you. But you will see nwe error
            rejectUnauthorized: process.env.REJECTED_UNAUTHORIZED === 'true' // This line will fix new error
        }
    }
};

export const app: App = {
    app_env: process.env.APP_APP_ENV || 'development',
    port : parseInt(process.env.PORT || '8084', 10),
	host : process.env.APP_HOST || 'http://localhost',
	allowCorsOrigin : process.env.APP_ALLOW_CORS_ORIGIN || 'http://localhost:8085',
}