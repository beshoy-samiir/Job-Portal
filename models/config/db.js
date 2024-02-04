import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.dbURL)
}

export default connectDB;