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


app.get('/',(req,res)=>{
  res.send('your application is working now just gotta get the rest to go')
})

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


app.listen(process.env.PORT, ()=>{
  console.log(`Listening on port ${process.env.PORT}`)
})
