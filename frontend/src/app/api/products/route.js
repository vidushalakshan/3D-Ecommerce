import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import Product from "../../../lib/models/ProductModel";
import formidable from "formidable";
import { Readable } from "stream";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

// Disable Next.js bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Convert Fetch Request to Node-like IncomingMessage
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

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Define upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true }); // Ensure directory exists

    // Configure formidable
    const form = formidable({
      multiples: false,
      uploadDir: uploadDir,
      keepExtensions: true, // Preserve file extension
      maxFileSize: 5 * 1024 * 1024, // Limit file size to 5MB
      filter: ({ mimetype }) => {
        // Only allow images
        return mimetype && mimetype.startsWith("image/");
      },
    });

    // Parse form data
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(toNodeRequest(req), (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Normalize fields
    const normalizedFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, value[0]])
    );

    // Type casting
    if (normalizedFields.price) normalizedFields.price = Number(normalizedFields.price);
    if (normalizedFields.oldPrice) normalizedFields.oldPrice = Number(normalizedFields.oldPrice);
    if (normalizedFields.isHot) normalizedFields.isHot = normalizedFields.isHot === "true";

    // Handle image file
    let imagePath = "/uploads/default.jpg"; // Default image path
    if (files.image) {
      const file = files.image[0];
      const uniqueFileName = `${randomUUID()}${path.extname(file.originalFilename)}`;
      const newFilePath = path.join(uploadDir, uniqueFileName);

      // Move file to permanent location
      await fs.rename(file.filepath, newFilePath);

      // Store relative path for public access
      imagePath = `/uploads/${uniqueFileName}`;
    }

    // Create product in MongoDB
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