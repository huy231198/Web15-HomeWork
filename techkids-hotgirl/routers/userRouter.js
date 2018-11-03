const express = require('express');
const UserRouter = express.Router();

const UserModel = require('../models/userModel');

// Middleware
UserRouter.use((req, res, next) => {
    console.log("User middleware");
    next();
});
// /api/users => get all
UserRouter.get("/", (req, res) => {
    UserModel.find({}, "-password", (err, users) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.json({ success: 1, users });
    });
});
// get user by id
UserRouter.get("/:id", (req, res) => {
    let userId = req.params.id;
    UserModel.findById(userId, (err, userFound) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else if (!userFound._id) res.status(404).json({ success: 0, message: "Not found" })
        else res.json({ success: 1, users: userFound });
    });
});
// Create user
UserRouter.post("/", (req, res) => {
    console.log(req.body);
    const { name, email, password, avatar, intro } = req.body;
    UserModel.create({ name, email, password, avatar, intro }, (err, userCreated) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.status(201).json({ success: 1, users: userCreated });
    });
});

//edit user
UserRouter.put("/:id", (req, res) => {
    const userId = req.params.id;
    const { name, password, avatar, intro } = req.body;
    // UserModel.findByIdAndUpdate(userId, { name, password, avatar, intro }, { new: true }, (err, userUpdated) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else res.json({ success: 1, users: userUpdated });
    // });
    UserModel.findById(userId, (err, userFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else if (!userFound._id) res.status(404).json({ success: 0, message: "Not found" })
        else {
            for(key in { name, password, avatar, intro }) {
                if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
            }
            // userFound.name = name || userFound.name;
            // userFound.password = password || userFound.password;
            // userFound.avatar = avatar || userFound.avatar;
            // userFound.intro = intro || userFound.intro;

            userFound.save((err, userUpdated) => {
                if (err) res.status(500).json({ success: 0, message: err })
                else res.status(201).json({ success: 1, users: userUpdated });
            });
        };
    });
});


module.exports = UserRouter;