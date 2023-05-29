import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  job: {
    type: mongoose.Types.ObjectId,
    ref: "jobs",
    required: true,
  },
});

const Bookmark = mongoose.model("bookmarks", bookmarkSchema);
export default Bookmark;
