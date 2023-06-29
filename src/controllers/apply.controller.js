import Apply from "../models/apply.js";
import mongoose from "mongoose";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import User from "../models/user.js";
import Job from "../models/job.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
// create a storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },

  file: (req, file) => {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;

    return {
      bucketName: "uploads",
      filename: uniqueFilename,
    };
  },
});

// create a multer middleware instance
const upload = multer({ storage });

export const ApplyController = {
  getAllApplies: async (req, res) => {
    try {
      const applies = await Apply.find().populate("job");
      res.status(200).json({
        success: true,
        message: applies,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all applies",
      });
    }
  },
  getAllAppliesFromUser: async (req, res) => {
    try {
      const applies = await Apply.find({ userApply: req.params.id }).populate({
        path: "job",
        populate: {
          path: "company",
          model: "companies",
        },
      });
      res.status(200).json({
        success: true,
        message: applies,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all applies",
      });
    }
  },

  getAllAppliesFromHR: async (req, res) => {
    try {
      const applies = await Apply.find({ employer: req.params.id }).populate(["userApply","job"]);
      res.status(200).json({
        success: true,
        message: applies,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all applies",
      });
    }
  },

  getFilterAppliesFromHR: async (req, res) => {
    try {
      const applies = await Apply.find({ employer: req.params.id, status : req.params.status}).populate(["userApply","job"]);
      res.status(200).json({
        success: true,
        message: applies,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all applies",
      });
    }
  },

  getApply: async (req, res) => {
    try {
      const apply = await Apply.findById(req.params.id).populate([
        "userApply",
        "employer",
        "job",
      ]);
      res.status(200).json({
        success: true,
        message: apply,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },

  createApply: async (req, res) => {
    try {
      const userApply = User.find({ id: req.body.userApply });
      const employer = User.find({ id: req.body.employer });
      const job = Job.find({ id: req.body.job });
      if (!userApply)
        return res
          .status(404)
          .json({ success: false, message: "User apply not found" });
      if (!employer)
        return res
          .status(404)
          .json({ success: false, message: "Employer apply not found" });
      if (!job)
        return res
          .status(404)
          .json({ success: false, message: "Job  not found" });
      upload.single("file")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }
        const uniqueFilename = `${uuidv4()}-${req.file.originalname}`;

        const data = new Apply({
          userApply: req.body.userApply,
          employer: req.body.employer,
          job: req.body.job,
          file: uniqueFilename,
        });
        await Apply.create(data);
        return res
          .status(200)
          .json({ success: true, message: "Apply created" });
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  updateApplyStatus: async (req, res) => {
    try {
      const apply = await Apply.findById(req.params.id);
      if (!apply) {
        return res.status(404).json({
          success: false,
          message: "Apply not found",
        });
      }
      apply.status = req.body.status;
      if(apply.status === "accepted"){
        apply.message = req.body.message;
        apply.timeInterview = req.body.timeInterview;
        apply.placeInterview = req.body.placeInterview;
      }else if(apply.status === "declined"){
        apply.message = req.body.message;
      }
      await apply.save();
      res.status(200).json({
        success: true,
        message: apply,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when updating the apply status"+error,
      });
    }
  },

  deleteApply: async (req, res) => {
    try {
      await Apply.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Apply deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when deleting the apply",
      });
    }
  },
};
