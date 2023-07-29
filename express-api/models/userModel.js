import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "userName Is  Required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: [true, "Email Mustbe Unique"],
        lowercase: true
    },
    password: {
        type: String,
        minlength: [6, "Too Short Password"],
    },
    changePasswordTime: Date,
    resetCodePassword: String,
    resetCodeExpire: Date,
    resetCodeVerify:Boolean,
    role: {
        type: String,
        enum: ["user", "admin" , "superAdmin"],
        default: "user"
    },
    active: {
        type: Boolean,
        default: true
    },
    wishList:[ {
        type: mongoose.Schema.ObjectId,
        ref:"product"
    }],
    googleId:String
}, { timestamps: true });

// hashing password

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password, 12);
    next();
});

export const userModel = mongoose.model("users", userSchema);