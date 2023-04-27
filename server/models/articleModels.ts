import mongoose, { Schema, Document, InferSchemaType } from "mongoose";

let Article = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
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
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: ["published", "unpublished"],
            default: "published",
        },
    },
    { timestamps: true }
);

export type ArticleType = InferSchemaType<typeof Article>;

export default mongoose.model<ArticleType>("Article's", Article);
