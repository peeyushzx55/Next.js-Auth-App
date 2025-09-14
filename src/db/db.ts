import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB connected successfully");
    });

    connection.on("error", () => {
      console.log(
        "DB connection failed! Please check your DB is running.",
        error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Error in connecting the DB: ", error);
  }
}
