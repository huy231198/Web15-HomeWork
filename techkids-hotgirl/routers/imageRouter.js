const express = require('express');
const ImageRouter = express.Router();

const ImageModel = require('../models/imageModel');


ImageRouter.get("/", async (req, res) => {
    console.log("Get all image");
    // ImageModel.find({})
    //     .populate("user", "name avatar")
    //     .exec((err, images) => {
    //         if (err) res.status(500).json({ success: 0, error: err })
    //         else res.json({ success: 1, images });
    //     });
    try {
        const images = await ImageModel.find({})
            .populate("user", "name avatar")
        res.json({ success: 1, images });
    } catch (error) {
        res.status(500).json({ success: 0, error: err })
    }
});


ImageRouter.get("/:id", async (req, res) => {
    let imageId = req.params.id;
    // ImageModel.findById(imageId, (err, imageFound) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else if (!imageFound) res.status(404).json({ success: 0, message: "Not found!" })
    //     else res.json({ success: 1, user: imageFound });
    // });
    try {
        const imageFound = await ImageModel.findById(imageId)
            .populate("user", "name avatar")
        if (!imageFound) res.status(404).json({ success: 0, message: "Not found!" })
        else res.json({ success: 1, image: imageFound });
    } catch (error) {
        res.status(500).json({ success: 0, message: err });
    }
});


ImageRouter.post("/", async (req, res) => {
    console.log(req.body)
    // const { user, url, caption, title } = req.body;
    // ImageModel.create({ user, url, caption, title }, (err, imageCreated) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else res.status(201).json({ success: 1, user: imageCreated });
    // });
    try {
        const imageCreated = await ImageModel.create({ user, url, caption, title });
        res.status(201).json({ success: 1, image: imageCreated });
    } catch (error) {
        res.status(500).json({ success: 0, message: err });
    }
});


ImageRouter.put("/:id", async (req, res) => {
    const imageId = req.params.id;
    const { url, caption, title } = req.body;

    // ImageModel.findById(imageId, (err, imageFound) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else if (!imageFound) res.status(404).json({ success: 0, message: "Not found!" })
    //     else {
    //         for (key in { url, caption, title }) {
    //             if (imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
    //         }

    //         imageFound.save((err, imageUpdated) => {
    //             if (err) res.status(500).json({ success: 0, message: err })
    //             else res.json({ success: 1, image: imageUpdated });
    //         });
    //     };
    // });
    try {
        const imageUpdated = ImageModel.findById(imageId);
        if (!imageFound) res.status(404).json({ success: 0, message: "Not found!" })
        else {
            for (key in { url, caption, title }) {
                if (imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
            }
            let imageUpdated = await imageFound.save();
            res.json({ success: 1, image: imageUpdated });
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: err });
    }
});


ImageRouter.delete("/:id", async (req, res) => {
    const imageId = req.params.id;
    // ImageModel.remove({ _id: imageId }, (err) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else res.json({ success: 1 });
    // });
    try {
        await UserModel.remove({ _id: imageId });
        res.json({ success: 1 });
    } catch (error) {
        res.status(500).json({ success: 0, message: err });
    }
});

module.exports = ImageRouter;