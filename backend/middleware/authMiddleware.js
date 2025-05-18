import asyncHandler from "express-async-handler";
import createError from "http-errors";
import { checkTokenExpiry, verifyToken } from "../utils/utils.js";
import User from "../models/User.js";

const auth = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(createError(401, "Authentication token is required."));

    let decoded;
    try {
        decoded = await verifyToken(token); // returns payload (e.g. { email, id, exp })
    } catch (err) {
        return next(createError(401, "Invalid or malformed token."));
    }

    if (checkTokenExpiry(decoded.exp)) {
        return next(createError(401, "Token has expired. Please login again."));
    }

    const user = await User.findOne({ _id: decoded.id, email: decoded.email });
    if (!user || user.token !== token) {
        return next(createError(401, "User not found or token mismatch."));
    }

    req.user = user;
    next();
});

export { auth };
