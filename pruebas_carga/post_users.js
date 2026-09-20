import http from 'k6/http';
import { URL_BASE } from '../configuration/config.js';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const errores400 = new Counter('error_400_username_already_exists');


export const options = { 
    stages:[
    { duration: '30s', target: 25 },
    { duration: '1m', target: 25 },
    { duration: '30s', target: 0 },
    ],
};

export default function () {

    const url = `${URL_BASE}/api/users`;

    const numRandom = Math.floor(Math.random() * 100000);
    const numUser = `testpizza_${numRandom}`; // se define la base del usuario y se le agrega un número aleatorio

    const body = JSON.stringify({
        "username": numUser,
        "password": "testPQP09"
    });

    const params = {
        headers:{
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'token abcdef0123456789',
        },
    };

    const request = http.post(url, body, params);

    check(request, {
    'Se creó el usuario de forma exitosa': (r) => r.status === 201
});

if(request.status === 400)
{
    errores400.add(1);
}

sleep(1);

}