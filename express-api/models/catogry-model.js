import mongoose from "mongoose";

const catogrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "catogryName is required"],
        unique : [true, "catogryName must be unique"],
        minlength:[3 , "catogryName is shorter"],
        maxlength: [32, "To long catogryName"],
        trim:true
    },
    image: String
}, { timestamps: true });

export const catogryModel = mongoose.model("catogry", catogrySchema);