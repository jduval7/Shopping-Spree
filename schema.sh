mongoimport -d questions-answers -c answers --headerline --columnsHaveTypes --type='csv' /seed/answers.csv 
mongoimport -d questions-answers -c questions --headerline --columnsHaveTypes --type='csv' /seed/questions.csv 
mongoimport -d questions-answers -c photos --headerline --columnsHaveTypes --type='csv' /seed/answers_photos.csv 