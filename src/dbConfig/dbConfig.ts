import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database is Running");
    });
    connection.on("error", (error) => {
      console.log(
        "Something wrong in database connection please try again " + error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went Wrong " + error);
  }
}
