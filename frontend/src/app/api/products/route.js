import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import Product from "../../../lib/models/ProductModel";
import formidable from "formidable";
import { Readable } from "stream";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const config = {
  api: {
    bodyParser: false,
  },
};

function toNodeRequest(req) {
  const contentLength = req.headers.get("content-length");
  const contentType = req.headers.get("content-type");

  const nodeReq = Readable.from(req.body);
  nodeReq.headers = {
    "content-length": contentLength,
    "content-type": contentType,
  };
  return nodeReq;
}

const parseForm = async (req) => {
  await connectDB();
  const uploadDir = path.join(process.cwd(), "public/uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const form = formidable({
    multiples: false,
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    filter: ({ mimetype }) => mimetype && mimetype.startsWith("image/"),
  });

  const [fields, files] = await new Promise((resolve, reject) => {
    form.parse(toNodeRequest(req), (err, fields, files) => {
      if (err) reject(err);
      else resolve([fields, files]);
    });
  });

  const normalizedFields = Object.fromEntries(
    Object.entries(fields).map(([key, value]) => [key, value[0]])
  );

  if (normalizedFields.price) normalizedFields.price = Number(normalizedFields.price);
  if (normalizedFields.oldPrice) normalizedFields.oldPrice = Number(normalizedFields.oldPrice);
  if (normalizedFields.isHot) normalizedFields.isHot = normalizedFields.isHot === "true";

  return { normalizedFields, files, uploadDir };
};

export async function POST(req) {
  try {
    const { normalizedFields, files, uploadDir } = await parseForm(req);

    let imagePath = "/uploads/default.jpg";
    if (files.image) {
      const file = files.image[0];
      const uniqueFileName = `${randomUUID()}${path.extname(file.originalFilename)}`;
      const newFilePath = path.join(uploadDir, uniqueFileName);
      await fs.rename(file.filepath, newFilePath);
      imagePath = `/uploads/${uniqueFileName}`;
    }

    const newProduct = await Product.create({
      ...normalizedFields,
      image: imagePath,
    });

    return NextResponse.json({ message: "Product created", product: newProduct });
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { normalizedFields, files, uploadDir } = await parseForm(req);
    const { id } = normalizedFields; // Expect id in formData for edit
    if (!id) throw new Error("Product ID required for update");

    let imagePath = normalizedFields.existingImage || "/uploads/default.jpg"; // Send existingImage from frontend if no new file
    if (files.image) {
      const file = files.image[0];
      const uniqueFileName = `${randomUUID()}${path.extname(file.originalFilename)}`;
      const newFilePath = path.join(uploadDir, uniqueFileName);
      await fs.rename(file.filepath, newFilePath);
      imagePath = `/uploads/${uniqueFileName}`;
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { ...normalizedFields, image: imagePath },
      { new: true, runValidators: true }
    );

    if (!updated) throw new Error("Product not found");

    return NextResponse.json({ message: "Product updated", product: updated });
  } catch (err) {
    console.error("Error updating product:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) throw new Error("ID required");

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}