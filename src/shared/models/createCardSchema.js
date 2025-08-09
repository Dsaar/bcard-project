import Joi from "joi";

const createCardSchema = {
	title: Joi.string().min(2).max(256).required(),
	subtitle: Joi.string().min(2).max(256).required(),
	description: Joi.string().min(2).max(1024).required(),
	phone: Joi.string().min(9).max(11).required(),
	email: Joi.string().min(5).required(),
	web: Joi.string().min(14),
	imageUrl: Joi.string().min(14).required(),
	imageAlt: Joi.string().min(2).max(256).required(),
	state: Joi.string().allow(""),
	country: Joi.string().required(),
	city: Joi.string().required(),
	street: Joi.string().required(),
	houseNumber: Joi.number().required(),
	zip: Joi.number().allow("")
};

export default createCardSchema;
