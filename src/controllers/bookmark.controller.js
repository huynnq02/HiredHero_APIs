import Bookmark from "../models/bookmark.js";

export const BookmarkController = {
  getAllBookmarks: async (req, res) => {
    try {
      const bookmarks = await Bookmark.find();
      res.status(200).json({
        success: true,
        message: bookmarks,
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

      await Bookmark.create(data);
      return res.status(200).json({ success: true, message: "Bookmark created" });
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
