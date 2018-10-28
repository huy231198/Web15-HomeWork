const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Model = mongoose.model;

const ScoreSchema = new Schema({
    player1: {type: String},
    player2: {type: String},
    player3: {type: String},
    player4: {type: String},
    score1: {type: Number, default: 0},
    score2: {type: Number, default: 0},
    score3: {type: Number, default: 0},
    score4: {type: Number, default: 0}
});

const ScoreModel = mongoose.model("Score", ScoreSchema);

// QuestionModel.find({}, (err, questions) => {
//     if(err) console.log(err)
//     else console.log("questions", questions);
// });

module.exports = ScoreModel;