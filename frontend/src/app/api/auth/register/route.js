import { connectDB } from "@/lib/config/db";
import User from "../../../../lib/models/UserModel"
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    console.log("Registering user:", { name, email });
    

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered", user: newUser });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}