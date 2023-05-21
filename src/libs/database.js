import { Sequelize } from 'sequelize';
import config from '../config/index.js';

import setupModels from '../models/index.js';

const {
	env,
	dbHost,
	dbName,
	dbPassword,
	dbPort,
	dbUser,
	dbDialect
} = config;

const loggerDb = (msg) => console.log(msg);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	port: dbPort,
	dialect: dbDialect,
	logging: env === 'development' ? loggerDb : false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

setupModels(sequelize);

sequelize.sync();

export default sequelize;