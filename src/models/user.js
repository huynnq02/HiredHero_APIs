import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePicture: String,
  address: String,
  dateOfBirth: String,
  userType: {
    type: String,
    enum: ["employer", "jobseeker"],
    required: true,
  },
  // Additional fields specific to employers
  companyName: {
    type: String,
    required: function () {
      return this.userType === "employer";
    },
  },
  industry: {
    type: String,
    required: function () {
      return this.userType === "employer";
    },
  },
  // Additional fields specific to job seekers
  skills: {
    type: [String],
    required: function () {
      return this.userType === "jobseeker";
    },
  },
  experience: [
    {
      title: String,
      years: Number,
      company: {
        type: mongoose.Types.ObjectId,
        ref: "company",
      },
    },
  ],
});

const User = mongoose.model("users", userSchema);
export default User;
