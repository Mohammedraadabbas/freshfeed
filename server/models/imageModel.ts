import mongoose, { InferSchemaType } from "mongoose";

let Image = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true,
    },
    file: {
        type: Buffer,
        required: true,
    },
    type: {
        type: String,
        enum: ["article heading", "article body", "user profile"],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

export type ImageType = InferSchemaType<typeof Image>;

export default mongoose.model<ImageType>("Image's", Image);
