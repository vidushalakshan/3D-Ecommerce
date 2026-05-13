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
  const maskedUri = MONGODB_URI.replace(/\/\/.*:.*@/, "//<user>:<password>@");
  console.log("URI:", maskedUri);

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    }).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB connection error:", err);
      cached.promise = null; // Reset promise so next attempt can try again
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    console.error("Error awaiting database connection:", err);
    throw err;
  }
  return cached.conn;
}