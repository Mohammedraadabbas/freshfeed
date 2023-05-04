import joi, { PresenceMode, Schema } from "joi";
import validator from "./validator.js";
import { checkId } from "../middleware/checkId.js";

const articleSchema = joi.object({
    title: joi.string().min(3).max(100),
    headerImage: joi
        .string()
        .custom((value: string, helpers) => {
            if (!checkId(value)) return helpers.error("thumbnail.invalid");
            return value;
        }, "invalid thumbnail id")
        .message('"thumbnail" is invalid'),
    description: joi.string().min(10).max(700),
    body: joi.object(),
});

export const articleValidator = validator(articleSchema);
