import { NextFunction, Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { HttpError } from "../middleware/errorHandler.js";
import Image from "../models/imageModel.js";

export const handleUpload = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.file) {
            throw new HttpError(400, "No file was uploaded");
        }
        const { originalname, mimetype, buffer } = req.file;

        let image = await Image.create({
            name: originalname,
            mimetype,
            file: buffer,
        });
        res.json(image);
    } catch (err) {
        next(err);
    }
};

export const handleGetImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let id: Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);

        const image = await Image.findById(id);
        if (image == null) {
            throw new HttpError(404, "Image not found");
        }
        res.set("Content-Type", image.mimetype);
        res.send(image.file);
    } catch (err) {
        next(err);
    }
};

// let bucket: mongo.GridFSBucket;
// let gfs: Grid.Grid;

// mongoose.connection.on("connected", () => {
//     bucket = new mongo.GridFSBucket(mongoose.connection.db, {
//         bucketName: "profile.images",
//     });
// });
// export const handleUpload = async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     if (!req.file) {
//         throw new HttpError(400, "No file was uploaded");
//     }
//     const { originalname, mimetype, buffer } = req.file;

//     const writeStream = bucket.openUploadStream(originalname, {
//         contentType: mimetype,
//         metadata: {
//             type: "profile.image",
//             userId: "123459849321",
//         },
//     });
//     writeStream.end(buffer);

//     writeStream.on("finish", () => {
//         res.json({
//             filename: originalname,
//             message: "File uploaded successfully",
//         });
//     });

//     writeStream.on("error", (err) => {
//         console.log("Error uploading file:", err);
//         res.json({ error: "Error uploading file" });
//     });
// };

// export const handleGetImage = async (req: Request, res: Response) => {
//     let id: Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);
//     const readStream = bucket.openDownloadStream(id);
//     readStream.pipe(res);
// };
