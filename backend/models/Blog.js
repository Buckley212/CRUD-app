const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    post: String,
    likes: { type: Number, default: 0 }
})

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;