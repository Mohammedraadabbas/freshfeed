import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import registerRoute from "./routes/register.js";
import logInRoute from "./routes/logIn.js";
import logoutRoute from "./routes/logOut.js";
import tokenRoute from "./routes/token.js";
import articleRoute from "./routes/article.js";
import uploadRoute from "./routes/image.js";
// import profileRoute from "./routes/profileRoute.js";


if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

let PORT = process.env.PORT || 5000;
const app = express();
mongoose.connect(process.env.MONGODB_URI!).then(() => {
    mongoose.Error.ValidationError.prototype.message = "Validation failed";
    app.listen(Number(PORT), "192.168.0.111", () => {
        console.log("Listening");
    });
});

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


app.use("/register", registerRoute);
app.use("/login", logInRoute);
app.use("/logout", logoutRoute);
app.use("/token", tokenRoute);
app.use("/article", articleRoute);
app.use("/image", uploadRoute);
// app.use("/profile" , profileRoute);
app.use(errorHandler);
