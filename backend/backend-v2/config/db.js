import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Loads environment variables from the .env file

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit with failure
  }
};
