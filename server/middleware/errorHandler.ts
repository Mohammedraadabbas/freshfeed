import express, {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
} from "express";

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
    console.log("hello error handler")
    if (error instanceof HttpError) {
        return res.status(error.status).json({ error: error.message });
    }
    console.log(error.message)
};
