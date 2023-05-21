import { faker } from '@faker-js/faker';
import db from '../libs/database.js';
const { models } = db;


export const generatePets = async () => {
	try {
		const pets = [];
		const limit = 250;

		await models.Pet.destroy({ truncate: true });

		for (let index = 0; index < limit; index++) {
			pets.push({
				name: faker.person.firstName(),
				tag: faker.animal.type(),
			});
		}

		const petsCreated = await models.Pet.bulkCreate(pets);

		console.log(`${petsCreated.length} pets created`);
	} catch (error) {
		console.log(error);
	}


};

export const destroyPets = async () => {
	try {

		await models.Pet.destroy({ truncate: true });

		console.log(`${petsCreated.length} pets deleted`);
	} catch (error) {
		console.log(error);
	}
};

generatePets();
