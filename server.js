require('dotenv').config();
require('./config/database')
const express = require("express");
const methodOverride = require("method-override"); // new
const app = express();
const session = require('express-session');// for session
const MongoStore = require('connect-mongo');// to store session in mongo
const morgan = require('morgan');
const path = require("path");
const upload = require("./config/multer"); // Import Multer
const isSignedIn = require('./middelware/is-signed-in.js')
const passUserToView=require('./middelware/pass-user-to-veiw.js')

//models
const User = require("./models/user");


//middleware
app.use(morgan('dev'));
// need to put it to read the body in form
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public"))); //css
//session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            ttl: 7 * 24 * 60 * 60 // 1 week in seconds
        }),
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in millesecond
            httpOnly: true,
            secure: false,
        }
    })
);

app.use(passUserToView);
//====================================================
//import controller
const authCotroller = require('./controllers/authentication.js')
const placeController= require('./controllers/places.js');

//==================================================

//home page
app.get('/', authCotroller.home);

//signup page
app.get('/auth/sign-up', authCotroller.signUp)

//post sign up
app.post('/auth/sign-up', authCotroller.addUser)

//sign in page
app.get('/auth/sign-in', authCotroller.signInForm)

//sign in post
app.post('/auth/sign-in', authCotroller.signIn)

//sign out page and kill session
app.get('/auth/sign-out', authCotroller.signOut);

//about
//about us
app.get('/users/places/about', placeController.aboutUs);
app.use(isSignedIn);
//========================================================
// bahrain routes


//add page
app.get('/users/:userId/places/new', placeController.addPlacePage);

//post the add
app.post('/users/:userId/places/new',upload.single("imgUrl"), placeController.createPlaces)

//index page
app.get('/users/:userId/places', placeController.index)

//show page
app.get('/users/:userId/places/:placeId',placeController.show)

//delete place
app.delete('/users/:userId/places/:placeId', placeController.deletePlace)

//edit page
app.get('/users/:userId/places/:placeId/edit', placeController.edit);

// post edit
app.put('/users/:userId/places/:placeId',upload.single("imgUrl"),placeController.updatess);









//=============================================
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000");
});