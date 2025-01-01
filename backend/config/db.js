import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGODB is connected:${conn.connection.host}`);

    } catch (error) {
        console.error('error', message.error);
        process.exit(1);
    }
}