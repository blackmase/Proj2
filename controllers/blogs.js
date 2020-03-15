const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs.js');



// router.get('/seed', (req,res) => {
// 	Blog.create(
// 		[
//
// 		{
// 			name:'grapefruit',
// 			topic:'pink',
//       img: String
// 		}
//
// 		]
// 		)
// })

router.put('/blogs/:id', (req,res) =>{
    Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedModel) => {
    res.redirect('/blogs');

    })
});

// router.put('/blogs/:id', (req,res) =>{
//     Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedComment) =>{
//         res.send('/blogs/:id',
//         {
//           comment: req.body.comment
//         }
//       );
//
//     })
//
// });

// router.put('/blogs/:id', (req,res) =>{
//
//     Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedComment) => {
//     res.redirect('/blogs/:id');
//
//     })
// })

router.get('/blogs/:id/edit', (req,res)=>{
    Blog.findById(req.params.id, (error, foundBlog) =>{
    res.render(
        'edit.ejs',
        {
            blog: foundBlog
        }
        )

    })
})


router.delete('/blogs/:id', (req,res) =>{
    Blog.findByIdAndRemove(req.params.id, (error, data) =>{
        res.redirect('/blogs');
    })

});


router.get('/blogs/new', (req, res) => {
    res.render('new.ejs')
});


router.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (error, foundBlog) => {
        res.render(
            'show.ejs',
            {
                blog: foundBlog

            }
        )
    })
});





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

router.get('/', (req, res) => {
    if(req.session.user){
      Blog.find({}, (error, allBlogs) => {
        res.render(
          'blogs/index.ejs',
          {
            blogs:allBlogs,
            user:req.session.user
          }
        );
      })
    } else {
      res.redirect('/');
    }
  });



router.post('/blogs/', (req, res) => {
    Blog.create(req.body, (error, createdBlog) => {
        res.redirect('/blogs');
    })
});
// router.post('/blogs/:id', (req, res) => {
//   Blog.create(req.params.id, req.body, (error, createdComment) => {
//     res.redirect('/blogs/:id');
//   })
// });

module.exports = router;
