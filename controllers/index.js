const Post = require("../models/post.model");

const HomeController = (req, res) => {
    res.status(200).json({
        message: "welcome to blog api with database",
    });
};

const CreatedBlogController = async (req, res) => {
    try {
        //Create an instance of blog post
        let post = new Post(req.body);
        await post.save();
        // let post = await Post.create(req.body);
        console.log(post);
        return res.status(201).json({
            message: "Blog Post Created",
            post,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Server issuess",
        });
    }
};

const GetAllBlogController = async (req, res) => {
    try {
        let posts = await Post.find({});
        return res.status(200).json({
            message: "post fetched",
            posts,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server Error",
        });
    }
};


const GetBlogIdController = async (req, res) => {
    try {
         let post = await Post.findOne({ _id: req.params.id });
         return res.status(200).json({
         message: "post id fecthed",
         post,
     });
 
     } catch (err) {
         console.log(err);
         return res.status(500).json({
             message: "blog id not created",
         });
     }
 };


const GetBlogByIdController = async (req, res) => {
    try {
        // let post = await Post.findById(req.params.blogId);
        let post = await Post.findOne({ _id: req.params.blogId });
        if (!post) {
            return res.status(404).json({ message: "post does not exits" });
        }
        return res.status(200).json({
            message: "Post fetched",
            post,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "server issues",
        });
    }
};

 const UpdateBlogByIdController = async (req, res) => {
    try {
        // let post = await Post.findByIdAndUpdate(req.params.blogId, req.body, {
        //     upsert: true,
        //     returnDocument: "after",
        //     Lean: true,
        // });

        let post = await Post.findById(req.params.blogId);
        if (!post) {
            return res.status(404).json({ message: "post does not exist" });
        }

        const { author, content, title, image, comments} = req.body;
        post.author = author;
        post.content = content;
        post.title = title;
        post.image = image;
        post.comments = comments;
        await post.save();
        return res.status(200).json({
            message: "post updated",
            post,
        });

    } catch (err) {
        console.log(err);
        return res.status(200).jsona({
            message: "server issues"
        });
            
  }

};

const DeleteBlogByIdController = async function (req, res) {
    try {
        let post = await Post.findByIdAndDelete(req.params.blogId);
        if (!post) {
            return res.status(404).json({
                message: "post does not exist, cannot delete"
            });
        }
        return res.status(204).send();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server issues",
        });
    }

};

const NotFoundController =  (req, res) => {
    res.status(404).json({
        message: "resource not found",
    })
};



module.exports = {
    HomeController,
    CreatedBlogController,
    GetAllBlogController,
    GetBlogIdController,
    GetBlogByIdController,
    UpdateBlogByIdController,
    DeleteBlogByIdController,
    NotFoundController,
};