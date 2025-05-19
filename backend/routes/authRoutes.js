import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { auth } from "../middleware/authMiddleware.js";
import ApiResponse from "../utils/ApiResponse.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").delete(auth, logoutUser);

userRouter.route("/profile").get(auth, (req, res) => {
    const user = req.user;
    res.status(200).json(new ApiResponse({
        _id: user._id,
        username: user.username,
        email: user.email
    }, "Profile fetched"));
});

export { userRouter };