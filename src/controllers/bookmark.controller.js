import Bookmark from "../models/bookmark.js";
import Job from "../models/job.js";
import User from "../models/user.js";

export const BookmarkController = {
  getAllBookmarks: async (req, res) => {
    try {
      const bookmarks = await Bookmark.find();
      res.status(200).json({
        success: true,
        message: "Bookmarks fetched successfully",
        data: bookmarks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all bookmarks",
      });
    }
  },
  getAllBookmarksOfUser: async (req, res) => {
    try {
      const bookmarks = await Bookmark.find({
        user: req.params.userId,
      }).populate({
        path: "job",
        populate: { path: "company" },
      });

      res.status(200).json({
        success: true,
        message: "Bookmarks fetched successfully",
        data: bookmarks,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when getting all bookmarks",
      });
    }
  },
  getBookmark: async (req, res) => {
    try {
      const bookmark = await Bookmark.findById(req.params.id).populate([
        "user",
        "job",
      ]);
      res.status(200).json({
        success: true,
        message: bookmark,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },

  createBookmark: async (req, res) => {
    try {
      const data = new Bookmark({
        user: req.body.user,
        job: req.body.job,
      });
      // check if job and user exists
      const job = await Job.findOne({ _id: req.body.job });
      const user = await User.findOne({ _id: req.body.user });
      if (!job)
        return res
          .status(404)
          .json({ success: false, message: "Job not found" });
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      await Bookmark.create(data);
      return res
        .status(200)
        .json({ success: true, message: "Bookmark created" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  deleteBookmark: async (req, res) => {
    try {
      await Bookmark.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Bookmark deleted",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when deleting the bookmark",
      });
    }
  },
};
