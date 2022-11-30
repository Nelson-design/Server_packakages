const {Schema, model} = require("mongoose");


const postSchema = new Schema({
    author: {type: String, default: "" },
    title: { type: String, default: "" },
    image: { type: String, default:  "" },
    comment: { type: String, default: "" },
    content: {
        type: String,
        default: "",
    },
},
{
  timestamps : true, 
}

);

const Post = model("Post", postSchema);
module.exports = Post;