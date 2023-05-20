import mongoose, { InferSchemaType, Model, Schema, Types } from "mongoose";

let ImageSchema = new Schema({
    article: {
        type: String,
        required: true,
        ref:"Article"
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
export type ImageType = InferSchemaType<typeof ImageSchema>;

const ImageModel: Model<ImageType> = mongoose.model<ImageType>("ArticlesImages", ImageSchema);
export default ImageModel;
