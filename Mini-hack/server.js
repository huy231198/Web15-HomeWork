const express = require('express');
const bodyParser = require('body-parser');
const moongoose = require('mongoose');
const app = express();
const ScoreModel = require('./models/scoreModel')

moongoose.connect("mongodb://localhost/Mini-hack", (err) => {
    if (err) console.log(err);
    else console.log("DB connect success")
});

app.use(bodyParser.urlencoded({ extended: false }
));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/create.html')
});
app.get('/addround', (req, res) => {
    res.sendFile(__dirname + '/public/addround.html')
});
app.post('/createnewgame', (req, res) => {
    console.log(req.body)

    ScoreModel.create({
        player1: req.body.player1,
        player2: req.body.player2,
        player3: req.body.player3,
        player4: req.body.player4,
    
    },
        (err, scoreCreated) => {
            if (err) console.log(err)
            else res.redirect('/score/' + scoreCreated._id);
        });
});

app.use(express.static('public'));

app.listen(1125, (err) => {
    if (err) console.log(err)
    else console.log('Server is listening at port 1125')
});