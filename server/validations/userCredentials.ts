import joi from "joi";
import validator from "./validator.js";

const userSchema = joi.object({
    name: joi.string().min(3).max(50).required(),
    sex: joi.string().required(),
    email: joi.string().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
});

export const userValidator = validator(userSchema);
