// Craverly / Server / server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

/* -------- INITIALIZE EXPRESS -------- */
const app = express();

/* -------- CONNECT TO DATABASE -------- */
connectDB();

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigin = process.env.FRONTEND_URLS.split(",");

      if (!origin || allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working!"));
app.use("/api/user", userRouter);

/* -------- PORT -------- */
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
