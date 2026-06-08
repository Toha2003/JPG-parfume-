import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import {
  errorHandler,
  notFoundHandler,
  requestLogger
} from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(requestLogger);

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "data", "images")));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "JPG Perfume Backend API is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  // console.log("JPG Perfume Backend API");
  // console.log(`Server running on http://localhost:${PORT}`);
  // console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  // console.log(`CORS enabled for: ${CORS_ORIGIN}`);
});

export default app;
