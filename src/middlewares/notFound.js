export const notFound = (req, res, next) => {
	const error = new Error(`Route Not found: The requested route ${req.method} ${req.url} does not exist`);

	res.status(404);
	next(error);
};