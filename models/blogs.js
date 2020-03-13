const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: { type: String, required:true },
    topic: { type: String },
    img: {type: String},
    video: {type: String},
    blog: {type: String},
    comment: {type: String}
    // readyToEat: Boolean
});

const BlogsModel = mongoose.model('Blog', blogSchema);

module.exports = BlogsModel;
