import express from "express";
const router = express.Router();

import { JobController } from "../controllers/job.controller.js";

router.get("/getAllJobs", JobController.getAllJobs);

router.get("/getAllJobsNonExpired", JobController.getAllJobsNonExpired);


router.get("/getJob/:id", JobController.getJob);

router.get("/getAllJobsFromCompany/:id", JobController.getAllJobsFromCompany);

router.get("/getAllJobsFromCompanyNonExpired/:id", JobController.getAllJobsFromCompanyNonExpired);

router.post("/createJob", JobController.createJob);

router.put("/updateJob/:id", JobController.updateJob);

router.delete("/deleteJob/:id", JobController.deleteJob);

export default router;
