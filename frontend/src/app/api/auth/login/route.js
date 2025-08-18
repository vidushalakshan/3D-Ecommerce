import { connectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";


const LoadDB = async () => {
    await connectDB();
}

LoadDB();

export async function GET(request) {
  return NextResponse.json({
    message: "Admin GET API called successfully",
  });
}

export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}-${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}-${image.name}`;
    console.log(imgUrl);
    return NextResponse.json({imgUrl})
}