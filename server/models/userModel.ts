import mongoose, { InferSchemaType, Model, Schema, Types } from "mongoose";

let User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    avatar: {
        type: Types.ObjectId,
        ref: "Image's",
        required: false,
    },

    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "superadmin"],
    },
});
export type UserType = InferSchemaType<typeof User>;

const UserModel: Model<UserType> = mongoose.model<UserType>("User", User);
export default UserModel;
