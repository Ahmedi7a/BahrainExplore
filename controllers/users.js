const User = require('../models/user');

async function index(req,res){
 const users= await User.find({})
 res.render('users/index.ejs',{title:'community', users})
}

async function show(req,res){
    try {
        const user = await User.findById(req.params.userId);
        res.render('users/show.ejs', { title: `${user.username}'s Plan`, user });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

module.exports = {
    index,
    show,
}