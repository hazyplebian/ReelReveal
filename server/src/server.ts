import express from "express";
import mongoose from "mongoose";
import config from "./config/connection.js";

const app = express();

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
