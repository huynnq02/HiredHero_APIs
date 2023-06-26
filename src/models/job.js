import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Types.ObjectId,
    ref: "companies",
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  employer: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  salary: String,
  location: String,
  type: String,
  description: String,
  expired: String,
});

const Job = mongoose.model("jobs", jobSchema);
export default Job;
