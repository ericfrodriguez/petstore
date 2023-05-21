import app from '../src/app.js';
import request from 'supertest';
import { expect } from 'chai';
import db from '../src/libs/database.js';

describe('Tests on /pets path', () => {

	let server = null;
	let api = null;

	before(async () => {
		server = app.listen(8000);
		api = request(app);
	});

	describe('GET /pets', () => {

		it('Should return a list of pets with default limit (10)', async () => {
			const { body } = await api.get('/pets');
			expect(body.pets.length).to.equal(10);
		});

		it('Should return a list of pets with limit param (lower or equals than 100)', async () => {
			const limit = 50;

			const { statusCode, body } = await api.get('/pets').query({ limit });
			expect(body.pets.length).to.equal(limit);
		});

		it('Should return a list of pets with max limit(100)', async () => {
			const limit = 150;

			const { statusCode, body } = await api.get('/pets').query({ limit });
			expect(body.pets.length).to.equal(100);
		});

		it('Should return status (200) if pets are found', async () => {
			const { statusCode, body } = await api.get('/pets');
			expect(body.pets.length).to.be.greaterThan(0);
			expect(statusCode).to.equal(200);
		});

		it('Should return status (404) and message error if pets are not found', async () => {

			const limit = 100;
			const page = 5;

			const { statusCode, body } = await api.get('/pets').query({ limit, page });
			expect(statusCode).to.equal(404);
			expect(body.code).to.equal(statusCode);
			expect(body.message).to.equal('Pets not found');
		});

		it('Should exists "x-next" property on header with link to next page', async () => {

			const limit = 100;
			const page = 2;

			const { headers } = await api.get('/pets').query({ limit, page });
			expect(headers).to.have.property('x-next');
			expect(headers['x-next']).to.have.string(`page=${page + 1}`);

		});

		it('Should exists "x-next" property on headers with link to same page', async () => {

			const limit = 100;
			const page = 3;
			let lastPage;

			const petsCounter = await db.models.Pet.count();
			lastPage = Math.ceil(petsCounter / limit);

			const { headers } = await api.get('/pets').query({ limit, page });
			expect(headers['x-next']).to.have.string(`page=${lastPage}`);
		});
	});

	describe('GET /pets/:petId', async () => {
		it('', () => {

		});
	});

	describe('POST /pets', async () => {
		it('', () => {

		});
	});

	after(async () => {
		server.close();
	})

});

