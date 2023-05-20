import mongoose, { InferSchemaType, Schema } from "mongoose";
import Agenda, { Job } from "agenda";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI! } });

let Token: Schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    token: {
        type: String,
        required: true,
    },
});

export type TokenType = InferSchemaType<typeof Token>;

const mongooseModel = mongoose.model<TokenType>("Token", Token);

agenda.define("remove after 5m", async (job: Job<{ token: string }>, done) => {
    try {
        const result = await mongooseModel.deleteOne({ token: job.attrs.data.token });
        await job.remove();
        done();
    } catch (error: any) {
        done();
    }
});

Token.post("save", function (doc) {
    agenda.schedule("in 1 minutes", "remove after 5m", { token: doc.token });
});

agenda.on("ready", function () {
    agenda.start();
});


export default mongooseModel;
