import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo DB connected");
    });

    connection.on("error", (error) => {
      console.log("Mongo DB connection error", error);
      process.exit();
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
