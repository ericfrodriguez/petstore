import db from '../../libs/database.js';
const { models } = db;

export const create = async (req, res, next) => {
	try {
		const { Pet } = models;
		const { name, tag } = req.body;

		if (!name) {
			return res.status(400).json({
				code: res.statusCode,
				message: '"name" field cannot be null'
			});
		}

		await Pet.create({
			name,
			tag
		});

		return res.status(201).json({
			code: res.statusCode,
			message: 'Pet created'
		});

	} catch (error) {
		res.status(500);
		next(error);
	}
};