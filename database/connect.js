import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already connected.");
      return;
    }

    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (connection.readyState === 1) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectMongo;
