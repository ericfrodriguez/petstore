import dotenv from 'dotenv';

dotenv.config();

const config = {
	env: process.env.NODE_ENV || 'development',
	dbName: process.env.DB_NAME,
	dbUser: process.env.DB_USER,
	dbHost: process.env.DB_HOST,
	dbPassword: process.env.DB_PASSWORD,
	dbPort: process.env.DB_PORT,
	dbDialect: process.env.DB_DIALECT
};

export default config;