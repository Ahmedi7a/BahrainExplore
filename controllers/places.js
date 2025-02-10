const User = require('../models/user');
const cloudinary = require("../config/cloudinary") // require Cloudinary in the controller file


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

// show page
async function show(req, res) {
    try {
        const currentUser = await User.findById(req.params.userId);
        const currentPlace= currentUser.places.id(req.params.placeId);

        res.render('places/show.ejs', { title: currentPlace.name, currentPlace})
    } catch (err) {
        console.log(err)
        res.redirect('/');
    }

}

//delete app
async function deletePlace(req,res){
    try{
        const currentUser= await User.findById(req.params.userId);
        currentUser.places.id(req.params.placeId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/places`)
        

    }catch(err){
        console.log(err)
        res.redirect('/'); 
    }

}

// edit page
async function edit(req,res){
    try {
        const currentUser = await User.findById(req.params.userId)
        const currentPlace = currentUser.places.id(req.params.placeId)
        res.render('places/edit.ejs', {
            title: currentPlace.name,
            currentPlace,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }}


// update post
async function update(req,res){
    try{
        const currentUser = await User.findById(req.params.userId)
        const currentPlace = currentUser.places.id(req.params.placeId)
        currentPlace.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/places/${req.params.placeId}`)  
      }catch(err){
        console.log(err)
        res.render('places/errorM.ejs',{title:'error'})
        // res.redirect('/')

    }
}

//=============================================
//about page
function aboutUs(req,res){

    res.render('places/about.ejs',{title:'about us'})
}

//===================================
async function createPlaces(req, res) {
    try {
        console.log(req.body);
        console.log(req.file);

        const currentUser = await User.findById(req.params.userId);

        const newPlace = {
            name: req.body.name,
            location: req.body.location,
            description: req.body.description,
            category: req.body.category,
            imgUrl: req.file
                ? { url: req.file.path, cloudinary_id: req.file.filename }
                : null, 
        };

        currentUser.places.push(newPlace);
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/places`);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}

async function updatess(req, res) {
    try {
        const currentUser = await User.findById(req.params.userId);
        const currentPlace = currentUser.places.id(req.params.placeId);

        // this is when i upolad new it delete the old one in cloud
        if (req.file) {
            if (currentPlace.imgUrl && currentPlace.imgUrl.cloudinary_id) {
                await cloudinary.uploader.destroy(currentPlace.imgUrl.cloudinary_id); 
            }
            // assign new image 
            req.body.imgUrl = {
                url: req.file.path,
                cloudinary_id: req.file.filename,
            };
        }

        currentPlace.set(req.body);
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/places/${req.params.placeId}`);
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}




//=================
module.exports = {
    addPlacePage,
    createPlace,
    index,
    show,
    deletePlace,
    edit,
    update,
    aboutUs,
    createPlaces, //
    updatess, //

}