var express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const getQuestionsAndAnswers = require('./aggregate').getQuestionsAndAnswers;
const getAnswers = require('./aggregate').getAnswers;
const addQuestion = require('../db/index.js').addQuestion;
const addAnswer = require('../db/index.js').addAnswer;
const markHelpful = require('../db/index.js').markHelpful;
const reportQuestion = require('../db/index.js').reportQuestion;
const markAnswerHelpful = require('../db/index.js').markAnswerHelpful;
const reportAnswer = require('../db/index.js').reportAnswer;
const db = require('../db/index.js').db;
const app = express();
const PORT = 3000;
app.use(express.json())
app.use(bodyParser.json());


app.get('/qa/questions', function (req, res) {
    console.log('*** question requested ***')

    db
        .collection('questions')
        .aggregate(getQuestionsAndAnswers(13))
        .toArray((err, results) => {
            //console.log(results);
            if (err) {
                PromiseRejectionEvent(console.log('***error getting questions***'))
            } else {
                console.log('***success!!***')
                res.send(results)
            }
        })
})

app.get('/qa/questions/:question_id/answers', function (req, res) {
    console.log('*** answers requested ***')

    db
        .collection('answers')
        .aggregate(getAnswers(62))
        .toArray((err, results) => {
            console.log(results);
            if (err) {
                PromiseRejectionEvent(console.log('***error getting questions***'))
            } else {
                console.log('***success!!***')
                res.send(results)
            }
        })
})

app.post('/qa/questions/', (req, res) => {
    console.log('*** post question requested ***')
    //console.log(req.body);
    addQuestion(req.body);
    res.send('201 CREATED');

})

app.post('/qa/questions/:question_id/answers', (req, res) => {
    console.log('*** post answer to question requested ***')
    //console.log(req.body);
    //console.log(req.params, 'here');
    addAnswer(req.body, req.params.question_id);
    res.send('201 CREATED');

    // db
    //   collection('questions')

})

app.post('/qa/questions/:question_id/helpful', (req, res) => {
    console.log('*** mark a question as helpful ***')

    let id = parseInt(req.params.question_id)

    markHelpful(id);
    res.send('204 NO CONTENT');
})

app.post('/qa/questions/:question_id/report', (req, res) => {
    console.log('*** report a question ***')

    let id = parseInt(req.params.question_id)

    reportQuestion(id);
    res.send('204 NO CONTENT');
})

app.post('/qa/answers/:answer_id/helpful', (req, res) => {
    console.log('*** mark an answer as helpful ***')

    let id = parseInt(req.params.answer_id)

    markAnswerHelpful(id);
    res.send('204 NO CONTENT');
})

app.post('/qa/answers/:answer_id/report', (req, res) => {
    console.log('*** report an answer ***')

    let id = parseInt(req.params.answer_id)

    reportAnswer(id);
    res.send('204 NO CONTENT');
})

app.listen(PORT, () => {
    console.log(`Server listening at localhost:${3000}!`);
});