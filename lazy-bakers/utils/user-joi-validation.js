const Joi = require('joi');


userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    profileImage: Joi.string().required()
});

module.exports = userValidationSchema;