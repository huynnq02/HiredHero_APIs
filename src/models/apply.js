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
  file: String,
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
});

const Apply = mongoose.model("applies", applySchema);
export default Apply;
