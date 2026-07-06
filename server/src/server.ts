import dotenv from "dotenv";
import http from "http";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { initializeSocket } from "./socket";

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const start = async () => {
    await connectDB();
    initializeSocket(server);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

start();