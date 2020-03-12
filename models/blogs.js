const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: { type: String, required:true },
    topic: { type: String, required:true },
    // readyToEat: Boolean
});

const BlogsModel = mongoose.model('Blog', blogSchema);

module.exports = BlogsModel;
