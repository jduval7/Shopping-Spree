const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

const questionSchema = new Schema({
    question_id: Number,
    product_id: Number,
    question_body: String,
    question_date: { type: Date, default: Date.now },
    asker_name: String,
    email: String,
    reported: Boolean,
    question_helpfulness: Number,
    answers: Array,
    count: Number,
    page: Number
})


const answerSchema = new Schema({
    answer_id: Number,
    question_id: Number,
    body: String,
    date: { type: Date, default: Date.now },
    answerer_name: String,
    email: String,
    reported: Boolean,
    helpfulness: Number,
    photos: Array
})