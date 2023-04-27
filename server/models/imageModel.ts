import mongoose, { Schema, Document, InferSchemaType } from "mongoose";

let Image = new mongoose.Schema(
    {
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
            required: true
        }
    }
);

export type ImageType = InferSchemaType<typeof Image>;

export default mongoose.model<ImageType>("Image's", Image);
