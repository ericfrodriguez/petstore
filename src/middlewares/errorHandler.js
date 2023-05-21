export const errorHandler = (err ,req, res, next) => {
	console.log(err);
	return res.status(res.statusCode || 500).json({
		code: res.statusCode,
		message: err.message
	});
};