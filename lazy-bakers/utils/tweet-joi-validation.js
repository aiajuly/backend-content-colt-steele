const Joi = require('joi');


tweetValidationSchema = Joi.object({
    tweet: Joi.string().required().max(255),
});

module.exports = tweetValidationSchema;