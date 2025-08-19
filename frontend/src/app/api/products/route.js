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