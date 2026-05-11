import { NextFunction, Request, Response } from "express";

const asyncHandler = (
    responseHandler: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<unknown>
) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        Promise.resolve(responseHandler(req, res, next))
            .catch((error) => next(error));
    };
};

export { asyncHandler };