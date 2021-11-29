const mongoose = require('mongoose');
const { Schema } = mongoose;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/sdc', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



const questionSchema = new Schema({
    question_id: Number,
    product_id: Number,
    question_body: String,
    question_date: { type: Date, default: Date.now },
    asker_name: String,
    asker_email: String,
    reported: Boolean,
    helpful: Number
})


const answerSchema = new Schema({
    answer_id: Number,
    question_id: Number,
    body: String,
    date: { type: Date, default: Date.now },
    answerer_name: String,
    answerer_email: String,
    reported: Boolean,
    helpful: Number
})

const photoSchema = new Schema({
    photo_id: Number,
    answer_id: Number,
    url: String
})

let question = mongoose.model('question', questionSchema)
let answer = mongoose.model('answer', answerSchema)
let photo = mongoose.model('photo', photoSchema)

let addQuestion = async (data) => {
    // console.log(data)
    let id = await question.findOne().sort({ 'question_id': -1 })
    id = id.question_id
    id = id + 1

    let question_id = id
    let product_id = data.product_id
    let question_body = data.body
    let asker_name = data.name
    let asker_email = data.email
    let reported = false
    let helpful = 0

    var submittedQuestion = new question({ question_id, product_id, question_body, asker_name, asker_email, reported, helpful })
    // console.log(submittedQuestion)
    submittedQuestion.save((err, doc) => {
        if (err) {
            return console.log(err)
        }
        console.log(submittedQuestion.asker_name + '\'s question was saved to the DB!!' )
    })
}

let addAnswer = async (data, id) => {
    let newID = await answer.findOne().sort({ 'answer_id': -1 })
    newID = newID.answer_id
    newID = newID + 1

    let answer_id = newID
    let question_id = id
    let body = data.body
    let answerer_name = data.name
    let answerer_email = data.email
    let reported = false
    let helpful = 0
    let photos = data.photos

    var submittedAnswer = new answer({ answer_id, question_id, body, answerer_name, answerer_email, reported, helpful, photos })
    // console.log(submittedAnswer)
        submittedAnswer.save((err, doc) => {
        if (err) {
            return console.log(err)
        }
        console.log(submittedAnswer.answerer_name + '\'s answer was saved to the DB!!' )
    })
}

let markHelpful = async (id) => {

    const filter = { question_id: id }
    const update = { $inc: { "helpful": 1 } }

    let helpful = await question.findOneAndUpdate(filter, update);

    console.log(helpful);
}

let reportQuestion = async (id) => {

    const filter = { question_id: id }
    const update = { "reported": true }

    let reported = await question.findOneAndUpdate(filter, update);
    console.log(reported);
}

let markAnswerHelpful = async (id) => {

    const filter = { answer_id: id }
    const update = { $inc: { "helpful": 1 } }

    let helpful = await answer.findOneAndUpdate(filter, update);

    console.log(helpful);
}

let reportAnswer = async (id) => {

    const filter = { answer_id: id }
    const update = { "reported": true }

    let reported = await answer.findOneAndUpdate(filter, update);

    console.log(reported);
}

module.exports.db = db;
module.exports.answer = answer;
module.exports.question = question;
module.exports.photo = photo;
module.exports.addQuestion = addQuestion;
module.exports.addAnswer = addAnswer;
module.exports.markHelpful = markHelpful;
module.exports.reportQuestion = reportQuestion;
module.exports.markAnswerHelpful = markAnswerHelpful;
module.exports.reportAnswer = reportAnswer;