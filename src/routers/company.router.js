import express from "express";
const router = express.Router();

import { CompanyController } from "../controllers/company.controller.js";

router.get("/getAllCompanies", CompanyController.getAllCompanies);

router.get("/getCompany/:id", CompanyController.getCompany);

router.post("/createCompany", CompanyController.createCompany);

router.put("/updateCompany/:id", CompanyController.updateCompany);

router.delete("/deleteCompany/:id", CompanyController.deleteCompany);

export default router;
