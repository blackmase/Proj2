const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const blogsController = require('./controllers/blogs.js')
const db = mongoose.connection;
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
//connect to controllers/_Method
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(blogsController);
// Connect to Mongo
mongoose.connect(process.env.DATABASE_URL, dbupdateobject);
// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', process.env.DATABASE_URL));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
    console.log('Connection made!');
});



app.put('/blogs/:id', (req,res) =>{

    Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedModel) => {
    res.redirect('/blogs');

    })
})

// app.put('/blogs/:id', (req,res) =>{
//
//     Blog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedComment) => {
//     res.redirect('/blogs/:id');
//
//     })
// })



app.get('/',(req,res)=>{
  res.send('your application is working now just gotta get the rest to go')
})

app.get('/blogs/:id/edit', (req,res)=>{
    Blog.findById(req.params.id, (error, foundBlog) =>{
    res.render(
        'edit.ejs',
        {
            blog: foundBlog,
            img: req.body.img
        }
        )

    })
})

app.delete('/blogs/:id', (req,res) =>{
    Blog.findByIdAndRemove(req.params.id, (error, data) =>{
        res.redirect('/blogs');
    })

})

app.get('/blogs/new', (req, res) => {
    res.render('new.ejs')
});

// app.post('/blogs/new', (req,res) =>{
// 	let newBlog = {
// 		name: req.body.name,
// 		description: req.body.description,
// 		img: req.body.img
// 	}
// 	Blog.push(newBlog);
// 	res.redirect('/blogs')
// })

app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (error, foundBlog) => {
        res.render(
            'show.ejs',
            {
                blog:foundBlog
            }
        )
    })
});
// app.post('/blogs/:id', (req, res) => {
//     Blog.findById(req.params.id, (error, foundBlog) => {
//         res.redirect(
//             'show.ejs',
//             {
//                 blog:foundBlog
//             }
//         )
//     })
// });

app.get('/blogs', (req, res) => {
    Blog.find({}, (error, allBlogs) => {
        res.render(
            'index.ejs',
            {
                blogs:allBlogs
            }
        );
    })
});

app.post('/blogs/', (req, res) => {
    Blog.create(req.body, (error, createdBlog) => {
        res.redirect('/blogs');
    })
});

// app.post('/blogs/:id', (req, res) => {
//   Blog.create(req.body, (error, createdComment) => {
//     res.redirect('/blogs/:id');
//   })
// });




app.listen(process.env.PORT, ()=>{
  console.log(`Listening on port ${process.env.PORT}`)
})
