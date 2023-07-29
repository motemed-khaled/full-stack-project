import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    cartItems: [{
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number,
            default:1
        }
    }],
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    }
}, { timestamps: true });

export const cartModel = mongoose.model("cart", cartSchema);