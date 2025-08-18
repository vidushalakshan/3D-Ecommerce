import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URL environment variable");
  }

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  console.log("Connecting to MongoDB...");
  

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
