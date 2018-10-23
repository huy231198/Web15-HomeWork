const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const moongoose = require('mongoose');

const QuestionModel = require('./models/questionModel')

moongoose.connect("mongodb://localhost/quyetde1", (err) => {
    if (err) console.log(err);
    else console.log("DB connect success")
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }
));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/answer.html')
});
app.get('/ask', (req, res) => {
    res.sendFile(__dirname + '/public/ask.html')
});
app.get('/answer', (req, res) => {
    res.sendFile(__dirname + '/public/answer.html')
});

app.post('/createquestion', (req, res) => {

    QuestionModel.create({
        questionContent: req.body.questionContent
    },
        (err, questionCreated) => {
            if (err) console.log(err)
            else res.redirect('/question/' + questionCreated._id);
        });
});

app.get('/randomquestion', (req, res) => {
    // let questionList = JSON.parse(fs.readFileSync('./questions.json'));
    // if (questionList.length > 0) {
    //     questionRandom = questionList[Math.floor(Math.random() * questionList.length)];
    //     res.send(questionRandom);
    // }
    QuestionModel.count({}, (err, count) => {
        let randomNum = Math.floor(Math.random() * count);

        QuestionModel.findOne({}, null, { skip: randomNum }, (err, questionFound) => {
            if (err) console.log(err)
            else res.send(questionFound);
        })
    })
});

app.post('/answer', (req, res) => {
    const { questionid, answer } = req.body;
    QuestionModel.findById(questionid, (err, questionFound) => {
        if (err) console.log(err)
        else if (!questionFound) console.log("Not found")
        else {
            questionFound[answer] += 1;
            questionFound.save((err, questionUpdated) => {
                if (err) console.log(err)
                else res.send({ success: 1 });
            })
        }
    })
});

app.get('/question/:questionId', (req, res) => {
    res.sendFile(__dirname + "/public/vote.html");
});

app.get('/questiondetail/:questionId', (req, res) => {
    // let questionList = JSON.parse(fs.readFileSync('./questions.json'));
    let questionId = req.params.questionId;
    // res.send({ success: 1, question: questionList[questionId] });
    QuestionModel.findById(questionId, (err, questionFound) => {
        if (err) console.log(err)
        else if (!questionFound) console.log("Not found 1")
        else res.send({ success: 1, question: questionFound });
    })
});

app.use(express.static('public'));

app.listen(1124, (err) => {
    if (err) console.log(err)
    else console.log('Server is listening at port 1124')
})