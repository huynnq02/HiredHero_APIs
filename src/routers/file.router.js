import express from "express";
import multer from "multer";
import {GridFsStorage} from 'multer-gridfs-storage';
import Grid from 'gridfs-stream';
import mongoose from "mongoose";
import crypto from 'crypto';
import path from 'path';
import { FileController } from "../controllers/file.controller.js";

const router = express.Router();
// Create storage engine
const storage =  new GridFsStorage({
  url: "mongodb+srv://hiredhero:doan1uit@hiredhero.wuax1be.mongodb.net/",
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage})

// test upload 
router.post("/upload", upload.single("file"), FileController.upload); 
router.get('/:filename',FileController.getFile);
router.delete("/deleteFile/:id",FileController.deleteFile)

export default router;