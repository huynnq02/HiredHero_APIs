//#region import package
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import multer from "multer";

//#region initialize server
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
//#end region
const upload = multer({ dest: "uploads/" });

//#region setup middleware
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//#end region

//#region import router
import authRouter from "./routers/auth.router.js";
import companyRouter from "./routers/company.router.js";
import jobRouter from "./routers/job.router.js";
import bookmarkRouter from "./routers/bookmark.router.js";
import applyRouter from "./routers/apply.router.js";
//#end region

//#region setup router
app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/bookmark", bookmarkRouter);
app.use("/api/apply", applyRouter);
//#end region

//#region connect to database
mongoose.set("strictQuery", false); // Add this line to address the deprecation warning

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!!!");
  })
  .catch((e) => {
    console.log(e);
  });
//#end region

//#region start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server's running on port: http://localhost:${PORT}`);
});
//#end region
