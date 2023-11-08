const Joi = require('joi');

module.exports.somethingSchema = Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
});


// we can then define a middlewere that validates our data:

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// then we can include this middlewere in our routes

// app.post('/campgrounds', validateCampground, catchAsync(async (req, res, next) => {  something }