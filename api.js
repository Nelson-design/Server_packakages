const express = require("express");
const mongoose = require("mongoose");
const api = express();
const port = 4800;
const Post = require("./models/post.model");
const {
    HomeController, 
    CreatedBlogController, 
    GetAllBlogController, 
    GetBlogIdController,
    GetBlogByIdController, 
    UpdateBlogByIdController, 
    DeleteBlogByIdController,
    NotFoundController
    } = require("./controllers");
    const { AppStarter} = require("./utils");

// configuration
api.use(express.json());
api.use(express.urlencoded({
    extended: true
    })
 );



// server index routes
api.get("/", HomeController);

// Create a blog post
api.post("/blog", CreatedBlogController);

// Get all blog post 
api.get("/blog", GetAllBlogController);

// Get a single blog post by id endpoint
api.get("/blog/:id", GetBlogIdController);

// class work: Do the Get a blog post by id at endpoint
api.get("/blog/:blogId", GetBlogByIdController);

// Do the Get and update a blog post by id at endpoin
api.put("/blog/:blogId", UpdateBlogByIdController);

api.delete("/blog/:blogId", DeleteBlogByIdController);


// Update a single blog post
// api.put("/blog/:id", async (req, res) => {
//     try {
//         let post = await Post.findOne({ _id: req.params.id }, req.body);
//         return res.status(200).json({
//             message: 'post updated',
//             post,
//         })
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             message: "Server error",
//         });
//     }

// });

// Delete a single blog post by id
// api.delete("/blog/:id", async (req, res) => {
//     try {
//         let post = await Post.findByIdAndDelete({_id: req.params.id});
//         return res.status(200).json({
//             message: "Blog deleted",
//             post,})
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             message: "Server Error",
//         });
//     }
// });

api.all("*", NotFoundController);

api.listen(port, AppStarter(port));

