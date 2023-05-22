import app from '../src/app.js';
import request from 'supertest';
import { expect } from 'chai';
import db from '../src/libs/database.js';


describe('Tests on /pets path', () => {

	let server = null;
	let api = null;

	before(async () => {
		server = await app.listen(8000);
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
			expect(body.code).to.equal(statusCode);
		});

		it('Should return status (404) if pets are not found', async () => {

			const limit = 100;
			const page = 5;

			const { statusCode, body } = await api.get('/pets').query({ limit, page });
			expect(statusCode).to.equal(404);
			expect(body.code).to.equal(statusCode);
		});

		it('Should return a message error "Pets not found" if pets are not found', async () => {

			const limit = 100;
			const page = 5;

			const { body } = await api.get('/pets').query({ limit, page });
			expect(body.message).to.equal('Pets not found');
		});

		it('Should exists "x-next" property on header with link to next page', async () => {

			const limit = 100;
			const page = 2;

			const { headers } = await api.get('/pets').query({ limit, page });
			expect(headers).to.have.property('x-next');
			expect(headers['x-next']).to.have.string(`page=${page + 1}`);

		});

		it('Should exists "x-next" property on header with link to same page', async () => {

			const limit = 100;
			const page = 3;
			let lastPage;

			const petsCounter = await db.models.Pet.count();
			lastPage = Math.ceil(petsCounter / limit);

			const { headers } = await api.get('/pets').query({ limit, page });
			expect(headers['x-next']).to.have.string(`page=${lastPage}`);
		});
	});

	describe('GET /pets/:petId', () => {
		it('Should return a pet with id equals to :petId', async () => {

			const petId = 5;

			const { body } = await api.get(`/pets/${petId}`);

			expect(body).to.have.property('pet');
			expect(body.pet).to.have.property('id').and.to.be.equal(petId);
			expect(body.pet).to.have.property('name').and.to.have.lengthOf.greaterThan(0);
			expect(body.pet).to.have.property('tag').to.satisfy((tag) => {
				return tag === null || tag.length > 0
			});
		});

		it('Should return status (200) if a pet with :petId exists', async () => {

			const petId = 5;

			const { body, statusCode } = await api.get(`/pets/${petId}`);

			expect(statusCode);
			expect(body.code).to.equal(statusCode);
		});

		it('Should return a message error "Pet not found" if pet with :petId is not found', async () => {

			const petId = 'InvalidId';
			const message = 'Pet not found';

			const { body } = await api.get(`/pets/${petId}`);

			expect(body.message).to.equal(message);
		});

		it('Should return status (404) if pet with :petId is not found', async () => {

			const petId = 'InvalidId';

			const { body, statusCode } = await api.get(`/pets/${petId}`);

			expect(statusCode).to.equal(404);
			expect(body.code).to.equal(statusCode);
		});

	});

	describe('POST /pets', () => {
		it('Should return status (400) if the field "name" is empty', async () => {
			const newPet = {
				name: ''
			};

			const { body, statusCode } = await api.post('/pets').send(newPet);

			expect(statusCode).to.equal(400);
			expect(body.code).to.equal(statusCode);
		});

		it('Should return a message \""name" field cannot be null\" if the field "name" is empty', async () => {
			const newPet = {
				name: ''
			};
			const message = '"name" field cannot be null'

			const { body } = await api.post('/pets').send(newPet);

			expect(body.message).to.equal(message);
		});

		it('Should return status (201) if the pet was created successfully', async () => {
			const newPet = {
				name: 'Messi',
				tag: 'goat'
			}

			const petsCounter = await db.models.Pet.count();
			
			const { body, statusCode } = await api.post('/pets').send(newPet);

			const newPetsCounter = await db.models.Pet.count();

			expect(petsCounter + 1).to.equal(newPetsCounter);
			expect(statusCode).to.equal(201);
			expect(body.code).to.equal(statusCode);
		});

	});

	after(async () => {
		server.close();
	})

});

