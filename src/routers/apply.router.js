import express from "express";
const router = express.Router();

import { ApplyController } from "../controllers/apply.controller.js";

router.get("/getAllApplies", ApplyController.getAllApplies);

router.get("/getAllAppliesFromUser/:id", ApplyController.getAllAppliesFromUser);

router.get("/getApply/:id", ApplyController.getApply);

router.post("/createApply", ApplyController.createApply);

router.put("/updateApplyStatus/:id", ApplyController.updateApplyStatus);

router.delete("/deleteApply/:id", ApplyController.deleteApply);

export default router;
