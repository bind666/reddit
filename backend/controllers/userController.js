import userModel from "../models/User.js";
import ApiResponse from "../utils/ApiResponse.js";
import createError from "http-errors";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { generateCookies } from "../utils/utils.js";

// Register User
import mongoose from 'mongoose';

const registerUser = asyncHandler(async (req, res, next) => {
    const isUser = await userModel.findOne({ email: req.body.email });
    if (isUser) return next(createError(422, "User already exists"));

    try {
        const user = await userModel.create(req.body);
        res.status(201).json(new ApiResponse(user, "User registered successfully"));
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // Collect all validation errors messages
            const messages = Object.values(error.errors).map(e => e.message);
            return next(createError(422, messages.join(', ')));
        }
        return next(error); // Other errors
    }
});


// Login User
const loginUser = asyncHandler(async (req, res, next) => {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "Invalid credentials"));

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) return next(createError(401, "Invalid credentials"));

    const payload = {
        id: user._id, // Use "id" here because your verifyToken uses decoded.id
        name: user.name,
        email: user.email,
    };

    const { token } = generateCookies(payload);
    user.token = token;
    await user.save();

    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
        token: user.token
    };

    res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        })
        .json(new ApiResponse(userData, "User logged in successfully"));
});

// Logout User
const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        const { _id } = req.user;
        await userModel.findByIdAndUpdate(_id, { token: null });

        res.status(200)
            .clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            })
            .json(new ApiResponse(null, "Logout successfully"));
    } catch (err) {
        return next(createError(500, "Logout failed"));
    }
});

export { registerUser, loginUser, logoutUser };
