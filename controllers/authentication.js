const User = require('../models/user')
const bcrypt = require("bcrypt"); //hash password


// (/)
async function home(req, res) {
    res.render("index.ejs", { title: 'My App' });
};

//sign up page
function signUp(req, res) {
    res.render('auth/sign-up.ejs', { title: 'Sign up', msg: '' });
}

//post sign up
async function addUser(req, res) {
    console.log(req.body);
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (userInDatabase) {
        return res.render('auth/sign-up.ejs', {
            title: "Sign up",
            msg: "Username already taken.",
        })
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.render('auth/sign-up.ejs', {
            title: "Sign up",
            msg: "Password and confirm must match.",
        })

    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10); //takes the normal p and give it 10 reandom hash
    req.body.password = hashedPassword;
    const user = await User.create(req.body)

    //once you sign up you get signed in
    req.session.user = user

    // if everything is ok
    req.session.save(()=> {
      res.redirect('/')  
    })
    
}

//signin page
function signInForm(req, res) {
    res.render('auth/sign-in.ejs', { title: 'Sign in', msg: '' });

}

//sign in post
async function signIn(req, res) {
    console.log(req.body)
    const userInDatabase = await User.findOne({ username: req.body.username })
    console.log(userInDatabase);
    if (!userInDatabase) {
        return res.render('auth/sign-in.ejs', {
            title: "Sign in",
            msg: "Invalid credentials. try again"
        })
    }
    //checking password.
    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password) //compare real p with hash in db
    if (!validPassword) {
        return res.render('auth/sign-in.ejs', {
            title: "Sign in",
            msg: "Invalid password. try again"
        })
    }
    req.session.user = userInDatabase

    // if everything is ok
    req.session.save(()=> {
      res.redirect('/')  
    })
    
}

//sign out page
function signOut(req, res) {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
}

//vip room, if logged in you can access, if not no
function welcome (req,res){
   res.send(`Welcome to the party ${req.session.user.username}.`);
}


//=========================
module.exports = {
    home,
    signUp,
    addUser,
    signInForm,
    signIn,
    signOut,
    welcome,
}