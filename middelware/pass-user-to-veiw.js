

function passUserToView(req, res, next) {
    res.locals.user = req.session.user ? req.session.user : null
    next();
}

module.exports = passUserToView;

// if(req.session.user){
//     req.locals.user = req.session.user
// }else{
//     req.locals.user =null 
// }