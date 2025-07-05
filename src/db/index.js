import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MondoDB connected");
    } catch (error) {
        console.error("MondoDb not connetced", error);
        process.exit(1)
    }
}

export default connectDB;