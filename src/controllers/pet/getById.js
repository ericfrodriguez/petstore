import db from '../../libs/database.js';
const { models } = db;


export const getById = async (req, res, next) => {
	try {
		const { Pet } = models;
		const { petId } = req.params;

		const pet = await Pet.findOne({
			where: {
				id: petId
			}
		});

		if(!pet) {
			return res.status(404).json({
				code: res.statusCode,
				message: 'Pet not found'
			});
		}

		return res.status(200).json({
			code: res.statusCode,
			pet
		});

	} catch (error) {
		res.status(500);
		next(error);
	}
};