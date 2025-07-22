import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import useragent from "express-useragent";

import authRoutes from "./routes/auth.js";

dotenv.config();

const startServer = async () => {
    try {
        const dbUri = process.env.MONGODB_URI;
        if (!dbUri) {
            console.error("❌ MongoDB URI is not defined");
            process.exit(1);
        }
        await mongoose.connect(dbUri);
        console.log("✅ MongoDB Connected");

        const app = express();

        app.use(cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"]
        }));

        app.use(express.json());
        app.use(useragent.express());

        app.use("/api/auth", authRoutes);

        app.get("/cors-check", (req, res) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json({ message: "CORS is working" });
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, "0.0.0.0", () =>
            console.log(`🚀 Server running on port ${PORT}`)
        );
    } catch (err) {
        console.error("❌ MongoDB Connection Failed:", err);
        process.exit(1);
    }
};

startServer();
