import { connectDB } from "@/lib/config/db";
import Product from "../../../lib/models/ProductModel";
import { NextResponse } from "next/server";

// create a new product
export async function POST(request) {
    try {
        await connectDB();
        const productData = await request.json();
        console.log("Creating product:", productData);
    
        const newProduct = await Product.create(productData);
        return NextResponse.json({ message: "Product created", product: newProduct });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

//Get all products
export async function GET() {
    try {
        await connectDB();
        const products = await Product.find({});
        return NextResponse.json(products);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}