const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs.js');


















router.get('/blogs', (req, res) => {
    Blog.find({}, (error, allBlogs) => {
        res.render(
            'index.ejs',
            {
                blogs:allBlogs
            }
        );
    })
});

module.exports = router;
