import express from "express";
const router = express.Router();

import { PostController } from "../controllers/post.controller.js";

router.get("/getAllPosts", PostController.getAllPosts);

router.get("/getPostDetail/:id", PostController.getPostDetail);

router.post("/createPost", PostController.createPost);

export default router;
