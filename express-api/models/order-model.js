import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: [true, "order must be belong to user"]
    },
    products: [{
        productId: {
            type: mongoose.Schema.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    shippingAddress: {
        details: String,
        phone: String,
        city: String,
        postalCode:String
    },
    totalOrderPrice: {
        type: Number
    },
    paymentMethodType: {
        type: String,
        enum: ["cash", "card"],
        default: "cash"
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: Date
}, { timestamps: true });

export const orderModel = mongoose.model("orders", orderSchema);