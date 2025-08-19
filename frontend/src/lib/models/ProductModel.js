import mongoose from "mongoose";
import { MdCategory } from "react-icons/md";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    model:{
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
    },
    isHot: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;