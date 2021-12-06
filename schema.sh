mongoimport -d questions-answers -c answers --headerline --columnsHaveTypes --type csv ~/seed/answers.csv 
mongoimport -d questions-answers -c questions --headerline --columnsHaveTypes --type csv ~/seed/questions.csv 
mongoimport -d questions-answers -c photo --headerline --columnsHaveTypes --type csv ~/seed/answers_photos.csv 

mongosh questions-answers --eval "db.answers.createIndex({question_id: 1})"
mongosh questions-answers --eval "db.answers.createIndex({answer_id: 1})"
mongosh questions-answers --eval "db.questions.createIndex({product_id: 1})"
mongosh questions-answers --eval "db.questions.createIndex({answer_id: 1})"
mongosh questions-answers --eval "db.questions.createIndex({question_id: 1})"
mongosh questions-answers --eval "db.photo.createIndex({answer_id: 1])"
