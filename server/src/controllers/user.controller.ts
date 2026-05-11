import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateToken } from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (
        [name, email, password, role].some(
            (field) =>
                typeof field !== "string" ||
                field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required!!!");
    }

    const existedUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists!!!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        }
    });

    const token = generateToken({
        userId: newUser.id,
        role: newUser.role
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                token,
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            },
            "User created successfully!!!"
        )
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (
        [email, password].some(
            (field) =>
                typeof field !== "string" ||
                field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required!!!");
    }

    const existedUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!existedUser) {
        throw new ApiError(404, "User does not exist!!!");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        existedUser.password
    );

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials!!!");
    }

    const token = generateToken({
        userId: existedUser.id,
        role: existedUser.role
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                token,
                user: {
                    id: existedUser.id,
                    name: existedUser.name,
                    email: existedUser.email,
                    role: existedUser.role
                }
            },
            "Login successful!!!"
        )
    );
});

const changePassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    if (
        [email, newPassword].some(
            (field) =>
                typeof field !== "string" ||
                field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required!!!");
    }

    const existedUser = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!existedUser) {
        throw new ApiError(404, "Invalid email!!!");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: {
            email
        },
        data: {
            password: hashedPassword
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password updated successfully!!!"
        )
    );
});

const verifyUserByEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (
        typeof email !== "string" ||
        email.trim() === ""
    ) {
        throw new ApiError(400, "Email is required!!!");
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    });

    if (!user) {
        throw new ApiError(404, "User does not exist!!!");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User verified successfully!!!"
        )
    );
});

export {
    registerUser,
    loginUser,
    changePassword,
    verifyUserByEmail
};