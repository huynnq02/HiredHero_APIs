import Apply from "../models/apply.js";

export const ApplyController = {
  getAllApplies: async (req, res) => {
    try {
      const applies = await Apply.find();
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
  getAllAppliesFromUser : async (req,res) => {
    try{
      const applies = await Apply.find({userApply : req.params.id});
      res.status(200).json({
        success: true,
        message: applies,
      });
    } catch (error){
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
        "jobseeker",
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
      const data = new Apply({
        userApply: req.body.userApply,
        jobseeker: req.body.jobseeker,
        file: req.body.file,
      });

      await Apply.create(data);
      return res.status(200).json({ success: true, message: "Apply created" });
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
      await apply.save();
      res.status(200).json({
        success: true,
        message: "Apply status updated",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when updating the apply status",
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
