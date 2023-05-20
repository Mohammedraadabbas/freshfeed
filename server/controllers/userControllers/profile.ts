import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/verifyJWT.js";
import User, { UserType } from "../../models/userModel.js";
import { HttpError } from "../../middleware/errorHandler.js";
import Avatar, { AvatarType } from "../../models/avatarModel.js";

export const handleGetUserProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    let { userId } = req;
    try {
        let userProfile = await User.findById(userId);
        if (userProfile == null) throw new HttpError(404, "User not found");

        return res.status(200).json(userProfile);
    } catch (err) {
        next(err);
    }
};

export const handleUpdateUserProfile = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    let { userId } = req;
    let params = req.body;
    try {
        let newProfile = await User.findOneAndUpdate({ _id: userId }, params, {
            new: true,
        });
        if (newProfile == null) throw new HttpError(404, "User not found");

        return res.status(200).json(newProfile);
    } catch (err) {
        next(err);
    }
};

export const handleGetUserAvatar = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let { id } = req.params;
        let userAvatar = await Avatar.findOne({ user: id });
        if (userAvatar == null)
            throw new HttpError(404, "user Avatar not found");

        res.setHeader("Content-Type", userAvatar.mimetype);
        res.status(200).send(userAvatar.image);
        return;
    } catch (err) {
        next(err);
    }
};

export const handleUploadUserAvatar = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            throw new HttpError(400, "No file was uploaded");
        }
        const userId = req.userId;
        const { originalname, mimetype, buffer } = req.file;

        let hasAvatar = await Avatar.findOne({ user: userId });
        if (hasAvatar != null)
            throw new HttpError(402, "User avatar already exists");

        let avatar = await Avatar.create({
            user: userId,
            image: buffer,
            mimetype,
        });

        res.status(201).json({ avatarId: avatar._id });
        return;
    } catch (err) {
        next(err);
    }
};

export const handleUpdateUserAvatar = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            throw new HttpError(400, "No file was uploaded");
        }
        const userId = req.userId;
        const { originalname, mimetype, buffer } = req.file;

        let avatar = await Avatar.findOneAndUpdate(
            { user: userId },
            { image: buffer, mimetype },
            {
                new: true,
            }
        );
        if (!avatar) throw new HttpError(404, "Avatar not found");

        res.json({ avatarId: avatar._id });
        return;
    } catch (err) {
        next(err);
    }
};
