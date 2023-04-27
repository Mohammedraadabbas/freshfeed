import mongoose, { InferSchemaType, Model, Schema, model } from "mongoose";
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

agenda.define("remove after 5m", async (job: Job<{ token: string }>, done) => {
    console.log("Executing job: remove after 5m");
    console.log("Job data: ", job.attrs.data);
    try {
        const result = await mongoose
            .model("token")
            .deleteOne({ token: job.attrs.data.token });
        console.log("Result: ", result);
        await job.remove();
        done();
    } catch (error: any) {
        console.error(error);
        done();
    }
});

Token.post("save", function (doc) {
    console.log("Token saved: ", this);
    agenda.schedule("in 1 minutes", "remove after 5m", { token: doc.token });
});

agenda.on("ready", function () {
    console.log("Agenda is ready, starting jobs...");
    agenda.start();
});


export default mongoose.model<TokenType>("Token", Token);;
