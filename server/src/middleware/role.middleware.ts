import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

const requireAdmin = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (req.user?.role !== "ADMIN") {
        throw new ApiError(403, "Access denied!!!");
    }

    next();
};

export { requireAdmin };