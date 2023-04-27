import mongoose, { Schema, Document, InferSchemaType } from "mongoose";

let profileImage = new mongoose.Schema(
    {
        
    }
);

export type ArticleType = InferSchemaType<typeof profileImage>;

export default mongoose.model<ArticleType>("usersProfileImage", profileImage);
