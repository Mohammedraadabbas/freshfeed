import { Request, Response } from "express";
import mongoose, { Types, mongo } from "mongoose";
import Grid from "gridfs-stream";
import { HttpError } from "../middleware/errorHandler.js";

let bucket: mongo.GridFSBucket;
let gfs: Grid.Grid;
mongoose.connection.on("connected", () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    bucket = new mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "profile.images",
    });
});
export const handleUpload = async (
    req: Request,
    res: Response
): Promise<void> => {
    if (!req.file) {
        throw new HttpError(400, "No file was uploaded");
    }
    const { originalname, mimetype, buffer } = req.file;

    const writeStream = bucket.openUploadStream(originalname, {
        contentType: mimetype,
        metadata: {
            userId: "123459849321",
        },
    });
    writeStream.end(buffer);

    writeStream.on("finish", () => {
        res.json({
            filename: originalname,
            message: "File uploaded successfully",
        });
    });

    writeStream.on("error", (err) => {
        console.log("Error uploading file:", err);
        res.json({ error: "Error uploading file" });
    });
};

export const handleGetImage = async (req: Request, res: Response) => {
    let id: Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);
    const readStream = bucket.openDownloadStream(id);
    readStream.pipe(res);
}
