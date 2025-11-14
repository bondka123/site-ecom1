import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import setupSwaggerDocs from "./config/swagger.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    process.env.FRONTEND_URL || "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Configuration Swagger
console.log("��� Configuration de Swagger...");
setupSwaggerDocs(app);

app.use("/api/auth", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("��� API is running...");
});

app.listen(port, () => {
  console.log(`��� Serveur lancé sur http://localhost:${port}`);
  console.log(`��� Documentation Swagger : http://localhost:${port}/api-docs`);
});
