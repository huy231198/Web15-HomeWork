const express = require('express');
const ImageRouter = express.Router();

const ImageModel = require('../models/ImageModel');

ImageRouter.use((req, res, next) => {
    console.log("Image middleware");
    next();
});

ImageRouter.get("/", (req, res) => {
    ImageModel.find({}, (err, users) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.json({ success: 1, images });
    });
});

ImageRouter.post("/", (req, res) => {
    console.log(req.body);
    const { user, view, like, url, caption, title, comments } = req.body;
    ImageModel.create({ user, view, like, url, caption, title, comments }, (err, imageCreated) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else res.status(201).json({ success: 1, images: imageCreated });
    });
});

ImageRouter.put("/:id", (req, res) => {
    const imageId = req.params.id;
    const { user, view , like, url, caption, title, comments } = req.body;
    // UserModel.findByIdAndUpdate(userId, { name, password, avatar, intro }, { new: true }, (err, userUpdated) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else res.json({ success: 1, users: userUpdated });
    // });
    ImageModel.findById(imageId, (err, imageFound) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else if (!imageFound._id) res.status(404).json({ success: 0, message: "Not found" })
        else {
            for (key in { user, view , like, url, caption, title, comments }) {
                if (imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
            }
            // userFound.name = name || userFound.name;
            // userFound.password = password || userFound.password;
            // userFound.avatar = avatar || userFound.avatar;
            // userFound.intro = intro || userFound.intro;

            imageFound.save((err, imageUpdated) => {
                if (err) res.status(500).json({ success: 0, message: err })
                else res.status(201).json({ success: 1, images: imageUpdated });
            });
        };
    });
});


module.exports = ImageRouter;