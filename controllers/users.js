const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/users.js');

router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

router.post('/', (req, res) => {
    // const result = bcrypt.hashSync('mypwd', bcrypt.genSaltSync(10));
    // res.send(result)
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
      req.session.user = createdUser;
        res.redirect('/blogs');
    })
});

module.exports = router;
