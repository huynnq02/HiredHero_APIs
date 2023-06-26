import Job from "../models/job.js";
import moment from "moment";
export const JobController = {
  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find().populate(["company"]);
      res.status(200).json({
        success: true,
        message: jobs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all jobs",
      });
    }
  },

  getAllJobsNonExpired: async (req, res) => {
    try {
      const currentDate = moment().format("YYYY-MM-DD");

      const jobs = await Job.find({ expired: { $gt: currentDate } }).populate(
        "company"
      );
      res.status(200).json({
        success: true,
        message: jobs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all jobs",
      });
    }
  },

  getJob: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id).populate("company");
      res.status(200).json({
        success: true,
        message: job,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },

  createJob: async (req, res) => {
    try {
      const data = new Job({
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        salary: req.body.salary,
        location: req.body.location,
        type: req.body.type,
        description: req.body.description,
      });

      await Job.create(data);
      return res.status(200).json({ success: true, message: "Job created" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  updateJob: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      await job.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when updating the job",
      });
    }
  },

  deleteJob: async (req, res) => {
    try {
      await Job.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Job deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when deleting the job",
      });
    }
  },

  getAllJobsFromCompany: async (req, res) => {
    try {
      const jobs = await Job.find({ company: req.params.id });
      res.status(200).json({
        success: true,
        message: jobs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all jobs",
      });
    }
  },

  getAllJobsFromCompanyNonExpired: async (req, res) => {
    try {
      const currentDate = moment().format("YYYY-MM-DD");

      const jobs = await Job.find({
        company: req.params.id,
        expired: { $gt: currentDate },
      });
      res.status(200).json({
        success: true,
        message: jobs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all jobs",
      });
    }
  },
};
