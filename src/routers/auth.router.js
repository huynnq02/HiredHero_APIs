import express from "express";
const router = express.Router();

import { AuthController } from "../controllers/auth.controller.js";

router.post("/createUser", AuthController.createUser);

router.post("/loginUser", AuthController.loginUser);

router.get("/getAllUser", AuthController.getAllUser);

router.get("/getUser/:id", AuthController.getUser);

router.put("/updateUser/:id", AuthController.updateUser);

router.delete("deleteUser/:id", AuthController.deleteUser);

export default router;
