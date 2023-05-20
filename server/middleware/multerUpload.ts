import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
const storage = multer.memoryStorage();

const fileFilter = function (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) {
    // Only accept image files
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        console.log(file.mimetype)
        const error = new multer.MulterError("LIMIT_UNEXPECTED_FILE", "upload");
        cb(error);
    }
};

export const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 15,
    },
    fileFilter,
});
