import mongoose from "mongoose";

async function connectDB(uri) {
  if (!uri) {
    throw new Error("Missing Mongo URI");
  }
  console.log("Connecting to MongoDB...");
  await mongoose.connect(uri);
}

export default connectDB;

