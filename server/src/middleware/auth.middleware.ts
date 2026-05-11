import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

interface JwtPayload {
    userId: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const verifyJWT = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const token =
            req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request!!!");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        req.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};

export { verifyJWT };