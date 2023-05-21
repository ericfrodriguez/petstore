import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import { serve, setup } from 'swagger-ui-express';
import specs from './docs/swagger.js';
import router from './routes/index.router.js';
import { errorHandler, notFound } from './middlewares/index.js';

const app = express();

const morganOpt = { 
	skip: () => process.env.NODE_ENV === 'test' 
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev', morganOpt));
app.use(cors());

app.use('/api', serve, setup(specs));

app.use(router);

app.use(notFound);
app.use(errorHandler);

export default app;