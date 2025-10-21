import { connectDB } from "@/lib/config/db";
import Product from "@/lib/models/ProductModel";
import { NextResponse } from "next/server";

// ✅ Get single product by ID
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
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
