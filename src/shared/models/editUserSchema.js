import Joi from "joi";

const editUserSchema = {
	first: Joi.string().allow("").min(2).max(256).required(),
	middle: Joi.string().allow("").min(2).max(256).required(),
	last: Joi.string().allow("").min(2).max(256).required(),
	phone: Joi.string().allow("").min(9).max(11).required(),
	url: Joi.string().allow("").min(14).required(),
	alt: Joi.string().allow("").min(2).max(256).required(),
	state: Joi.string().allow("").min(2).max(256).required(),
	country: Joi.string().allow("").min(2).max(256).required(),
	city: Joi.string().allow("").min(2).max(256).required(),
	street: Joi.string().allow("").min(2).max(256).required(),
	houseNumber: Joi.number().min(2).required(),
	zip: Joi.number().min(2).required(),
};


export default editUserSchema;
