import mongoose from "mongoose";

const getMongoUri = () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error(
            "Missing MONGO_URI in environment. Please set a valid mongodb:// or mongodb+srv:// connection string."
        );
    }

    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
        throw new Error(
            "Invalid MONGO_URI scheme. It must start with mongodb:// or mongodb+srv://."
        );
    }

    return uri;
};

export const connectDB = async () => {
    try {
        await mongoose.connect(getMongoUri());

        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};