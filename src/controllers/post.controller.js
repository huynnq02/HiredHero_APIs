import Post from "../models/post.js";
import Job from "../models/job.js";

export const PostController = {
    getAllPosts: async(req,res) => {
        try{
            const posts = await Post.find().populate("job");
            res.status(200).json({
                success: true,
                message: posts,
              });
        }catch (error) {
            res.status(500).json({
            success: false,
            message: "Error when getting all posts",
            });
        }
    },
    getPostDetail : async(req,res) => {
        try {
            const post = await Post.findById(req.params.id).populate("job");
            res.status(200).json({
              success: true,
              message: post,
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              message: error,
            });
          }
    }, 
    createPost: async(req, res) => {
        try {
            const data = new Job({
              company: req.body.company,
              jobTitle: req.body.jobTitle,
              salary: req.body.salary,
              location: req.body.location,
              type: req.body.type,
              description: req.body.jobDescription,
              expired: req.body.expired,
            });
      
            var result = await Job.create(data);
            if(result != null){
                const post = new Post({
                    title: req.body.postTitle,
                    description: req.body.postDescription,
                    job: result._id,
                    postDate: new Date().toISOString(),
                })
                await Post.create(post);
            }
            return res.status(200).json({ success: true, message: "Post created" });
          } catch (error) {
            res.status(400).json({ success: false, message: error.message });
          }
    },

}
