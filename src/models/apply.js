import mongoose from "mongoose";

const applySchema = new mongoose.Schema({
  userApply: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  employer: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  job: {
    type: mongoose.Types.ObjectId,
    ref: "jobs",
    required: true,
  },
  file: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  message: {
    type: String,
    required: function () {
      return this.status === "accepted" || this.status === "declined";
    },
  },
  expired: String,
  placeInterview: {
    type: String,
    required: function () {
      return this.status === "accepted";
    },
  },
  timeInterview:{
    type: String,
    required: function () {
      return this.status === "accepted";
    },
  }

});

const Apply = mongoose.model("applies", applySchema);
export default Apply;
