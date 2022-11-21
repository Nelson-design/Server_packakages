const express = require("express");
const cons = require("consolidate");
const path = require("path");
const server = express();
const port = process.env.PORT || 4000;
server.engine("HTML", cons.swig);
server.set("view engine", "html");
server.set("views", __dirname + "/views");

//Middleware to read JSON request body 
server.use(express.json());

// Middleware to formdata/urlenconded request body
server.use(express.urlencoded({
    extended: true,
    })
);

let database = [
    {
        id: 1,
        body: "welcome to my small world of peace",
        author: "Nelson",
        country: "Nigeria",
        date: Date.now()
    },
];

// server index routes 
server.get("/", (req, res) => {
    try {
        return res.status(200).json({
            message: "welcome to my blog api",
            date: Date.now(),
        });

    } catch (err) {
        console.log("error", err.message);
    }
});

// get all blog posts
server.get("/blog", (req, res) => {
    return res.status(200).json({
        message: "blog posts",
        data: database,
    });
});

// create blog post
server.post("/blog", (req, res) => {
    const dataWithId = { id: database.length + 1, ...req.body };
    database.push(dataWithId);
    return res.status(200).json({
        message: "blog created",
        data: req.body,
    });
});

// get a single blog posts
server.get("/blog/:id", (req, res) => {
    console.log(req.params);
    let blog = database.find((data) => data.id === Number(req.params.id));
    if (blog) {
        return res.status(200).json({
            message: "blog post found",
            data: blog,
        });
    }
    return res.status(404).json({message: "no blog post with that id"})
});

// update a single blog post 
server.put("/blog/:id", (req, res) => {
    let oldDataIndex = database.findIndex((data) => data.id === Number(req.params.id));

    console.log(oldDataIndex);

    if (oldDataIndex >= 0) {
        let oldData = database[oldDataIndex];

        let newData = { id: oldData.id, ...req.body };
        database[oldDataIndex] = newData;
        return res.status(200).json({
            message: "Post updated",
            data: oldData,        
        });
    } 
    return res.status(400).json({
         message: "post not found",
    });
});

//DELETE BLOG POST
server.delete("/blog/:id", (req, res) => {
    let index = database.findIndex((data) => data.id ===Number(req.params.id));

    if (index >= 0) {
        database = database.slice(0, index);
        return res.status(200).json({
            message: "Post deleted"
        })
    }
    return res.status(404).json({
        message: "post not found",
    })
})

server.listen(port, () => console.log(`server running on a ${port}`));

