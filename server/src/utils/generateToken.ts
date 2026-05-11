import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
    role: string;
}

const generateToken = ({ userId, role }: JwtPayload) => {
    return jwt.sign(
        { userId, role },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d"
        }
    );
};

export { generateToken };