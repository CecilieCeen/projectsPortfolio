const mongoose = require("mongoose");

var APIprofilePics = require('../models/profilePic.js')
const User = require('../models/user')



module.exports = {
    getpics: async function (req, res, next) {
        try{
            let pics = await APIprofilePics.find();
            res.locals.profilepics = pics;
            next()
        }catch (error) {
            res.status(400).json(error.message);
            }

},
    getspesificPic: async function (req,res, next) {
        try{
            let imgID = req.params.profilepics
            let imgurl = await APIprofilePics.find( { id: imgID } );
            res.locals.profilepics = imgurl;
            next();
        } catch (error) {
            res.status(400).json(error.message);
        }
},
}