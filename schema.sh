mongoimport -d questions-answers -c answers --headerline --columnsHaveTypes --type csv /seed/answers.csv 
mongoimport -d questions-answers -c questions --headerline --columnsHaveTypes --type csv /seed/questions.csv 
mongoimport -d questions-answers -c photo --headerline --columnsHaveTypes --type csv /seed/answers_photos.csv 

mongosh questions-answers --eval "db.answers.createIndexes([{question_id: 1},{answer_id: 1}])"
mongosh questions-answers --eval "db.questions.createIndexes([{question_id: 1}, {answer_id: 1}])"
mongosh questions-answers --eval "db.photo.createIndexes([{answer_id: 1}])"
