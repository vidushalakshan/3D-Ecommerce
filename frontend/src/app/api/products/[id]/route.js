import { connectDB } from "@/lib/config/db";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/constants/mockData";

// ✅ Get single product by ID
export async function GET(req, { params }) {
  try {
    const { id } = params;

    try {
      await connectDB();
      const product = await Product.findById(id);
      if (product) return NextResponse.json(product);
    } catch (dbErr) {
      console.error("DB connection failed, searching mock data:", dbErr.message);
    }

    // Fallback to MOCK_PRODUCTS if DB fails or product not found in DB
    const mockProduct = MOCK_PRODUCTS.find(p => p._id === id || p.id === Number(id));
    
    if (!mockProduct) {
      return NextResponse.json({ error: "Product not found in Database or Mock cache" }, { status: 404 });
    }

    return NextResponse.json(mockProduct);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ Update product by ID
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await req.json();
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ✅ Delete product by ID
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
