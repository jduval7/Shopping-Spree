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
// const db = require('../db/index.js').db;
const app = express();
const PORT = 3000;
app.use(express.json())
app.use(bodyParser.json());


app.get('/qa/questions', async function (req, res) {
    // console.log('*** question requested ***')
    // const db = await mongoose.connection
    //     db.collection('questions').aggregate(getQuestionsAndAnswers(parseInt(req.query.question_id)))
    //     .toArray((err, results) => {
    //         //console.log(results);
    //         if (err) {
    //             PromiseRejectionEvent(console.log('***error getting questions***'))
    //         } else {
    //             // console.log('***success!!***')
    //             res.status(200).send(results);
    //         }
    //     })

    try {
        const db = await mongoose.connection
        db.collection('questions').aggregate(getQuestionsAndAnswers(parseInt(req.query.question_id)))
        .toArray((err, results) => {
            //console.log(results);
            if (err) {
                PromiseRejectionEvent(console.log('***error getting questions***'))
            } else {
                // console.log('***success!!***')
                res.status(200).send(results);
            }
        })
    } catch (err) {
        console.log(err);
    }

})

app.get('/qa/questions/:question_id/answers', async function (req, res) {
    console.log('*** answers requested ***')

    const db = await mongoose.connection
        await db.collection('answers').aggregate(getAnswers(parseInt(req.params.question_id)))
        .toArray((err, results) => {
            // console.log(results);
            if (err) {
                PromiseRejectionEvent(console.log('***error getting questions***'))
            } else {
                console.log('***success!!***')
                res.status(200).send(results);
            }
        })
})

app.post('/qa/questions/', (req, res) => {
    console.log('*** post question requested ***')
    //console.log(req.body);
    addQuestion(req.body);
    res.status(201).send('CREATED');

})

app.post('/qa/questions/:question_id/answers', (req, res) => {
    console.log('*** post answer to question requested ***')
    //console.log(req.body);
    //console.log(req.params, 'here');
    addAnswer(req.body, parseInt(req.params.question_id));
    res.status(201).send('CREATED');

})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
    console.log('*** mark a question as helpful ***')

    let id = parseInt(req.params.question_id)

    markHelpful(id);
    res.status(204).send('NO CONTENT');
})

app.put('/qa/questions/:question_id/report', (req, res) => {
    console.log('*** report a question ***')

    let id = parseInt(req.params.question_id)

    reportQuestion(id);
    res.status(204).send('NO CONTENT');
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
    console.log('*** mark an answer as helpful ***')

    let id = parseInt(req.params.answer_id)

    markAnswerHelpful(id);
    res.status(204).send('NO CONTENT');
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
    console.log('*** report an answer ***')

    let id = parseInt(req.params.answer_id)

    reportAnswer(id);
    res.status(204).send('NO CONTENT');
})

app.listen(PORT, () => {
    console.log(`Server listening at localhost:${3000}!`);
});