import express, {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
} from "express";
import { MulterError } from "multer";

export class HttpError extends Error {
    public readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export const errorHandler = (
    error: HttpError | any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof HttpError) {
        return res.status(error.status).json({ error: error.message });
    }
    if (error instanceof MulterError) {
        return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
};
