import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  location: String,
  companySize: String,
  description: String,
  establishedYear: Number,
  job: [
    {
      type: mongoose.Types.ObjectId,
      ref: "jobs",
    },
  ],
  employee: [
    {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  ],
  website: String,
  email: String,
  hotline: String,
});

const Company = mongoose.model("companies", companySchema);
export default Company;
