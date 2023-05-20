import mongoose, { InferSchemaType, Model, Schema, Types } from "mongoose";

let AvatarSchema = new Schema({
    user: {
        type: Types.ObjectId,
        required: true,
        ref: "Users",
    },
    mimetype: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    },
});

export type AvatarType = InferSchemaType<typeof AvatarSchema>;

const AvatarModel: Model<AvatarType> = mongoose.model<AvatarType>(
    "UsersAvatar",
    AvatarSchema
);
export default AvatarModel;
