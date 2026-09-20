import http from 'k6/http';
import { URL_BASE } from '../configuration/config.js';
import { check, sleep } from 'k6';

export const options = { 
    stages:[
    { duration: '30s', target:  30},
    { duration: '1m', target: 40 },
    { duration: '30s', target: 0 },
    ],
};

export default function () {

    const idRating = 25;
    const url = `${URL_BASE}/api/ratings/${idRating}`;

    const params = {
        headers:{
        'Content-Type': 'application/json',
        'Authorization': 'token 0GBHYQdCvqyZ3sPQ',
        },
    };

    const request = http.del(url, null, params);

    check(request, {
    'No existe el rating': (r) => r.status === 400
});

sleep(1);

}