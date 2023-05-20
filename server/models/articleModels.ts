import mongoose, { InferSchemaType } from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        body: {
            type: Object,
            required: true,
        },
        tags: {
            type: [String], 
            required: true,
        },
        published: {
            type: Boolean,
            required: true,
            default: false, 
        },
    },
    { timestamps: true }
);

export type ArticleType = InferSchemaType<typeof articleSchema>;

export default mongoose.model<ArticleType>("Article", articleSchema);
