import express from "express";
const router = express.Router();

import { BookmarkController } from "../controllers/bookmark.controller.js";

router.get("/getAllBookmarks", BookmarkController.getAllBookmarks);

router.get("/getBookmark/:id", BookmarkController.getBookmark);

router.post("/createBookmark", BookmarkController.createBookmark);

router.delete("/deleteBookmark/:id", BookmarkController.deleteBookmark);

export default router;
