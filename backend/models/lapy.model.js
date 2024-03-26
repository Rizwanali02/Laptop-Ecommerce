import mongoose, { Schema } from "mongoose";

const lapySchema = mongoose.Schema({
    laptopName:{
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    processor: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    },
    storage: {
        type: String,
        required: true
    },
    displaySize: {
        type: String,
        required: true
    },
    graphicsCard: {
        type: String,
        required: true
    },

    mainImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },

    price: {
        type: Number,
        required: true
    },

    other: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    stock: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        required: true
    }


});

export const Lapy = mongoose.model("Lapy", lapySchema);