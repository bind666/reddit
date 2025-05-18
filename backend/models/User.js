import mongoose from 'mongoose';
import createError from "http-errors";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) next()
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next()

    } catch (error) {
        return next(createError(500, error.message))
    }
})

const User = mongoose.model('User', userSchema);
export default User;
