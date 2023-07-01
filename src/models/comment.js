import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  type: {
    enum: ["comment", "replyComment"],
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "post",
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    default: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  parentComment: {
    type: mongoose.Types.ObjectId,
    ref: "comments",
    required: function () {
      return this.type === "replyComment";
    },
  },
  childComments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "comments",
    },
  ],
});

const Comments = mongoose.model("comments", commentSchema);
export default Comments;
