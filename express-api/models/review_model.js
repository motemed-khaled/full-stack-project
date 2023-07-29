import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    rating: {
        type: Number,
        required: [true, "rating required"],
        min: [1, "min rating is 1.0"],
        max: [5, "max rating is 5.0"],
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: [true, "review must belong to user"]
    },
    productId: {
        type: mongoose.Schema.ObjectId,
        ref: "product",
        required: [true, "review must belong to product"]
    }
}, { timestamps: true });

export const reviewModel = mongoose.model("reviews", reviewSchema);