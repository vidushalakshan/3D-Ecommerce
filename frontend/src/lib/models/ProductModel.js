import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    model:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    type: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0.01,
    },
    oldPrice: {
        type: Number,
        required: false,
        min: 0.01,
    },
    isHot: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;