import {Model, DataTypes} from 'sequelize';

const PET_TABLE = 'pets';

const PetSchema = {
	name: {
		allowNull: false,
		type: DataTypes.STRING
	},
	tag: {
		allowNull: true,
		type: DataTypes.STRING
	}
};

class Pet extends Model {

	// config es el metodo que retorna las options de Model.init()
	static config(sequelize) {
		return {
			sequelize,
			tableName: PET_TABLE,
			modelName: 'Pet',
			timestamps: false,
		};
	}
}

export {
	PET_TABLE,
	PetSchema,
	Pet
};