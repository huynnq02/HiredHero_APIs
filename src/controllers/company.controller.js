import Company from "../models/company.js";

export const CompanyController = {
  getAllCompanies: async (req, res) => {
    try {
      const companies = await Company.find();
      res.status(200).json({
        success: true,
        message: companies,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all companies",
      });
    }
  },

  getCompany: async (req, res) => {
    try {
      const company = await Company.findById(req.params.id).populate([
        "job",
        "employee",
      ]);
      res.status(200).json({
        success: true,
        message: company,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },

  createCompany: async (req, res) => {
    try {
      const data = new Company({
        companyName: req.body.companyName,
        location: req.body.location,
        establishedYear: req.body.establishedYear,
        job: [],
        employee: [],
        website: req.body.website,
        email: req.body.email,
        hotline: req.body.hotline,
      });

      await Company.create(data);
      return res
        .status(200)
        .json({ success: true, message: "Company created" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  updateCompany: async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      await company.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when updating the company",
      });
    }
  },

  deleteCompany: async (req, res) => {
    try {
      await Company.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Company deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when deleting the company",
      });
    }
  },
};
