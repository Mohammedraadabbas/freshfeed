import mongoose, { InferSchemaType, Model, Schema, Types } from "mongoose";

let UserSchema = new Schema({
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
        lowercase:true
    },

    sex: {
        type: String,
        required: true,
        enum: ["male", "female"],
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
        default: "user"
    },
});
export type UserType = InferSchemaType<typeof UserSchema>;

const UserModel: Model<UserType> = mongoose.model<UserType>("Users", UserSchema);
export default UserModel;
