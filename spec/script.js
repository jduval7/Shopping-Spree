import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
    vus: 12,
    duration: '30s'
}

export default function () {
    const questionURL = 'http://localhost:3000/qa/questions'
    const answerURL = 'http://localhost:3000/qa/questions/62/answers'
    const helpfulQuestionURL = 'http://localhost:3000/qa/questions/61/helpful'
    const reportQuestionURL = 'http://localhost:3000/qa/questions/62/report'
    const helpfulAnswerURL = 'http://localhost:3000/qa/answers/123/helpful'
    const reportAnswerURL = 'http://localhost:3000/qa/answers/123/report'
    const questionPayload = JSON.stringify({
        "product_id": 13,
        "body": "5555 FAR OUT",
        "name": "johnny bones",
        "email": "forever@hotmail.com"
    })
    const answerPayload = JSON.stringify({
        "body": "6667 FAR OUT",
        "name": "johnny bones",
        "email": "forever@hotmail.com",
        "photos": ["https://cdn.pixabay.com/photo/2021/11/26/02/39/dog-6824999_1280.jpg"]
    })
    const params = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const questionsGet = http.get('http://localhost:3000/qa/questions?product_id=13')
    check(questionsGet, {
        'status 200': r => r.status === 200,
        'transaction time < 200ms': r => r.timings.duration < 200
    });
    // group('check the GET QUESTIONS request', () => {
    //     const questionsGet = http.get('http://localhost:3000/qa/questions?product_id=13')
    //     check(questionsGet, {
    //         'status 200': r => r.status === 200,
    //         'transaction time < 200ms': r => r.timings.duration < 200
    //     });
    // })
    // group('check the GET ANSWERS request', () => {
    //     const answersGet = http.get('http://localhost:3000/qa/questions?product_id=13/answers')
    //     check(answersGet, {
    //         'status 200': r => r.status === 200,
    //         'transaction time < 200ms': r => r.timings.duration < 200
    //     });
    // })

    // check(http.post(questionURL, questionPayload, params), {
    //     'status 201': r => r.status === 201,
    //     'transaction time < 200ms': r => r.timings.duration < 300
    // })
    // check(http.post(answerURL, answerPayload, params), {
    //     'status 201': r => r.status === 201,
    //     'transaction time < 200ms': r => r.timings.duration < 200
    // });
    //    check(http.put(helpfulQuestionURL, null, params), {
    //     'status 204': r => r.status === 204,
    //     'transaction time < 200ms': r => r.timings.duration < 200
    //    });
    //    check(http.put(reportQuestionURL, null, params), {
    //     'status 204': r => r.status === 204,
    //     'transaction time < 200ms': r => r.timings.duration < 200
    //    });
    //    check(http.put(helpfulAnswerURL, null, params), {
    //     'status 204': r => r.status === 204,
    //     'transaction time < 200ms': r => r.timings.duration < 200
    //    });
    //    check(http.put(reportAnswerURL, null, params), {
    //     'status 204': r => r.status === 204,
    //     'transaction time < 200ms': r => r.timings.duration < 200
    //    });

    // sleep(1)
}
