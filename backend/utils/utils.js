import path from "path";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import createError from "http-errors";
import config from "../config/config.js";

// for uploading the file
const fileUploader = async (file) => {
    if (!file) {
        throw createError(422, "File required.");
    }

    const uploadPath = path.join(process.cwd(), 'uploads', file.name);
    return new Promise((resolve, reject) => {
        file.mv(uploadPath, async (err) => {
            if (err) {
                return reject(createError(422, err.message));
            }

            try {
                // Upload to Cloudinary
                const cloudinaryResult = await cloudinary.uploader.upload(uploadPath, { folder: "insta-clone" });

                // Clean up the local file after upload
                fs.unlink(uploadPath, (err) => {
                    if (err) {
                        console.log("Error deleting file:", err.message);
                    } else {
                        console.log("File deleted.");
                    }
                });

                resolve(cloudinaryResult);
            } catch (error) {
                reject(error);
            }
        });
    });
};

// for deleting a file from Cloudinary
const fileRemover = async (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!key) {
                throw createError(422, "Key required.");
            }

            // Deleting file from Cloudinary
            await cloudinary.api.delete_resources([`insta-clone/${key}`], {
                type: 'upload',
                resource_type: 'image',
            });

            resolve(true);
        } catch (error) {
            reject(false);
            throw createError(409, error.message);
        }
    });
};

const generateCookies = (payload) => {
    if (!payload || typeof payload !== "object") {
        throw createError(422, "Payload required.");
    }

    const token = jwt.sign(payload, config.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
    return { token };
};

const verifyToken = async (token) => {
    return await jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET);
};

const checkTokenExpiry = (time) => {
    const expiryTime = new Date(time * 1000);
    return expiryTime <= new Date();
};

export { generateCookies, verifyToken, checkTokenExpiry };


export { fileUploader, fileRemover };
