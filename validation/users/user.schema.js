const joi = require("@hapi/joi");

const schema = {
	user: joi.object({
		name: joi.string().max(50).required(),
		email: joi.string().email().required(),
		gender: joi.string().valid("male","female").required(),
		phone: joi.number().integer().min(1000000000).message("Invalid mobile no").max(9999999999).message("Invalid mobile no").required()
	})
};

module.exports = schema;