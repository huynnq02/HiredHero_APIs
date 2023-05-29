import User from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const AuthController = {
  //Region get all user
  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json({
        success: true,
        message: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when get all user",
      });
    }
  },

  //GET An USER
  getUser: async (req, res) => {
    try {
      console.log(req.params.id);
      const user = await User.findById(req.params.id).populate([
        "languages",
        "educations",
        "jobs",
        "works",
        {
          path: "bookmarks",
          populate: { path: "postId", populate: { path: "author" } },
        },
        "resumes",
        "skills",
        "image_uploads",
        "reviews",
      ]);
      res.status(200).json({
        success: true,
        message: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error,
      });
    }
  },

  //DELETE
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: User,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when delete user",
      });
    }
  },

  //UPDATE
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Update Successful!");
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error when update user",
      });
    }
  },

  //End region
  //Region add new user
  createUser: async (req, res) => {
    try {
      const emailExists = await User.exists({ email: req.body.email });
      if (emailExists) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exists" });
      }

      const isValidPassword = validator.isLength(req.body.password, 8, 30);
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: "Password must be 8-30 characters",
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const data = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        userType: req.body.userType,
      });

      await User.create(data);
      return res.status(200).json({ status: true, message: "User created" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //End region
  //Region login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "Email does not exist" });
      }
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
      const { password, ...userData } = user.toObject();

      return res.status(200).json({
        success: true,
        message: "Login successfully",
        userData: user,
      });
      // const token = jwt.sign(
      //   { id: user._id, phone: user.phone },
      //   "secret",
      //   { expiresIn: "1h" }
      // );
      // return res.status(200).json({ success: true, token: token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  //End region
};
