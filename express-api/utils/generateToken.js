import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRETKEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
}