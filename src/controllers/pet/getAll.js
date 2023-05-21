import db from '../../libs/database.js';
const { models } = db;


export const getAll = async (req, res, next) => {
	try {
		const { Pet } = models;
		let { query, protocol } = req;
		const host = req.get('host');
		const basedUrl = `${protocol}://${host}`;

		let limit = Math.floor(Number(query.limit)) || 10;
		let page = Math.floor(Number(query.page)) || 1;
		let offset = 0;

		if (limit > 100) {
			limit = 100;
		}

		if (page > 1) {
			offset = (Number(page) - 1) * limit || 0;
		}

		const options = {
			offset,
			limit
		};

		const petsCounter = await Pet.count();
		const pets = await Pet.findAll(options);

		const allPages = petsCounter / limit;
		
		if (pets.length === 0) {
			return res.status(404).json({
				code: res.statusCode,
				message: 'Pets not found'
			});
		}
		
		if (pets.length > 0 && page <= allPages) {
			res.set('x-next', `${basedUrl}/pets?limit=${limit}&page=${page + 1}`);
		} else {
			res.set('x-next', `${basedUrl}/pets?limit=${limit}&page=${page}`);
		}

		return res.status(200).json({
			code: res.statusCode,
			pets
		});

	} catch (error) {
		res.status(500);
		next(error);
	}
};