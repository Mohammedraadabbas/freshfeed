import joi, { PresenceMode, Schema } from "joi";

const validator =
    (schema: Schema) =>
    <T>(payload: T, presence: PresenceMode = "required") =>
        schema.validate(payload, { abortEarly: false, presence });

export default validator;
