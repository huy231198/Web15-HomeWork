const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    intro: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: "Image" }]
});

module.exports = mongoose.model("User", UserSchema);