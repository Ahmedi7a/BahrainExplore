const User = require('../models/user');

//show add page
function addPlacePage(req, res) {
    res.render('places/new.ejs', { title: 'Add Place' })
}

// post add
async function createPlace(req, res) {
    try {
        console.log(req.body)
        const currentUser = await User.findById(req.params.userId);
        currentUser.places.push(req.body)//pushing the form data into user model
        await currentUser.save()// it will save the push
        res.redirect(`/users/${currentUser._id}/places`)
    } catch (err) {
        console.log(err)
        res.redirect('/');
    }
}

//index page, show all places
async function index(req, res) {
    try {
        const currentUser = await User.findById(req.params.userId);
        res.render('places/index.ejs', { title: 'All Places', places: currentUser.places, })
    } catch (err) {
        console.log(err)
        res.redirect('/');
    }

}

//=================
module.exports = {
    addPlacePage,
    createPlace,
    index,

}