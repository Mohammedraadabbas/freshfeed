import mongoose, { InferSchemaType } from "mongoose";

let Article = new mongoose.Schema(
    {
        creator: {
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
            type: Object,
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
