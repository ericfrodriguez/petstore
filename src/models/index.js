import { Pet, PetSchema } from './pet.model.js';

function setupModels(sequelize) {
	Pet.init(PetSchema, Pet.config(sequelize));
}

export default setupModels;