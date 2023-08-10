import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [3, "to short product title"],
        maxlength: [100, "to long product title"],
        required: [true, "product titile is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "product description is required"],
        minlength: [20, "to short product description"]
    },
    quantity: {
        type: Number,
        required: [true, "product quantity is required"]
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "product prce is required"],
        trim: true,
        max: [200000, "to long product price"]
    },
    colors: [String],
    imageCover: {
        type: String,
        required: [true, "product image cover is required"]
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "catogry",
        required: [true, "product must be belong to catogry"]
    },
    ratingsAverage: {
        type: Number,
        min: [1, "Rating must be equal or above 1.0"],
        max: [5, "Rating must be equal or below 5.0"],
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const productModel = mongoose.model("product", productSchema);