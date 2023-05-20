import { NextFunction, Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { HttpError } from "../middleware/errorHandler.js";
import Image from "../models/imageModel.js";
import { AuthRequest } from "../middleware/verifyJWT.js";

export const handleUpload = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.file) {
            throw new HttpError(400, "No file was uploaded");
        }
        const userId = req.userId
        const { originalname, mimetype, buffer } = req.file;
        
        let image = await Image.create({
            owner:userId,
            name: originalname,
            mimetype,
            file: buffer,
        });
        res.json({imagId: image._id});
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

export const handleDeleteImage = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const id: Types.ObjectId = new mongoose.Types.ObjectId(req.params.id);
        const image = await Image.findById(id);
        if (image == null) throw new HttpError(404, "Image not found");
        
        const userId = req.userId;
        if (image.owner?.toString() !== userId) throw new HttpError(401, "Unauthorized access");

        await Image.deleteOne({_id: id});

        res.status(204).json({ message: "Image deleted" });
    } catch (err) {
        next(err);
    }
};
