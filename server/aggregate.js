

// db.questions.aggregate([
//   { $match: { question_id: { $lt: 15 } } },
//   {
//     $lookup:
//     {
//       from: "answers",
//       localField: "question_id",
//       foreignField: "question_id",
//       as: "answers"
//     }
//   }])

// db.questions.aggregate(pipeline);


module.exports.getQuestionsAndAnswers = (product_id) => {
  return ([
    { $match: { product_id: 13 } },
    { $sort: { question_id: 1 } },
    { $limit: 15 },
    {
      $lookup: {
        from: "answers",
        localField: "question_id",
        foreignField: "question_id",
        pipeline: [
          {
            $lookup: {
              from: "photo",
              localField: "answer_id",
              foreignField: "answer_id",
              as: "photos",
            },
          }
        ],
        as: "answers",
      },
    },
  ])
}

module.exports.getAnswers = (question_id) => {
  return ([
    { $match: { question_id: question_id } },
    // { $sort: { question_id: 1 } },
    { $limit: 15 },
    {
      $lookup: {
        from: "photo",
        localField: "answer_id",
        foreignField: "answer_id",
        as: "photos",
      },
    },
  ])
}
