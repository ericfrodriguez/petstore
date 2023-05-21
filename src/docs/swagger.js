import __dirname from '../../utils.js';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Swagger Petstore',
			version: '1.0.0',
			description: 'Test prueba tecnica HAZ',
		}
	},
	apis: [`${__dirname}/src/docs/**/*.yaml`]
};

const specs = swaggerJSDoc(swaggerOptions);

export default specs;