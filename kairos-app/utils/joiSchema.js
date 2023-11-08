const Joi = require('joi');


watchesValidationSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    itemNo: Joi.number().required().min(0),
    img: Joi.string().required()
});

module.exports = watchesValidationSchema;