import http from 'k6/http';
import { URL_BASE } from '../configuration/config.js';
import { check, sleep } from 'k6';

export const options = { 
    stages:[
    { duration: '30s', target: 20 },
    { duration: '30s', target: 20 },
    { duration: '30s', target: 30 },
    { duration: '30s', target: 0 },
    ],
};

export default function () {

    const idRating = 10;
    const url = `${URL_BASE}/api/ratings/${idRating}`;

    const body = JSON.stringify({
        "stars": 3,
        "pizza_id": 1
    });

    const params = {
        headers:{
        'Content-Type': 'application/json',
        'Authorization': 'token 0GBHYQdCvqyZ3sPQ',
        },
    };

    const request = http.put(url, body, params);

    check(request, {
    'Se modificó la calificación de forma exitosa': (r) => r.status === 200
});

sleep(1);

}