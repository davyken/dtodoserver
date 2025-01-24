import joi from 'joi';

const registerSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    password: joi.string().min(5).max(10).required(),
    email: joi.string().email().required()
});

const registerValidator = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 'error', message: error.details[0].message });
    }
    next();
};

export default registerValidator