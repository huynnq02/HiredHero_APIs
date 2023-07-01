import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    postDate: String,
    job: {
        type: mongoose.Types.ObjectId,
        ref: "jobs",
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
});

const Post = mongoose.model("posts", postSchema);
export default Post;
