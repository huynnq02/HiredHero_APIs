import express from "express";
const router = express.Router();

import { JobController } from "../controllers/job.controller.js";

router.get("/getAllJobs", JobController.getAllJobs);

router.get("/getJob/:id", JobController.getJob);

router.post("/createJob", JobController.createJob);

router.put("/updateJob/:id", JobController.updateJob);

router.delete("/deleteJob/:id", JobController.deleteJob);

export default router;
