import http from 'k6/http';
import { URL_BASE } from  '../configuration/config.js';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const errores500 = new Counter('error_500');
const errores401 = new Counter('error_401');
const erroresTimeout = new Counter('error_timeout');
const erroresOtros = new Counter('error_otros_codigos');

export const options = { 
    stages:[
    { duration: '1m', target: 250 },
    { duration: '1m', target: 500 },
    { duration: '1m', target: 750 },
    { duration: '1m', target: 1000 },
    { duration: '3m', target: 1000 },
    { duration: '1m', target: 0 },
    ],
};

export default function () {
    const url = `${URL_BASE}/api/doughs`;

    const params = {
        headers:{
            'accept': 'application/json',
            'Authorization': 'token abcdef0123456789',
        },
    };

    const request = http.get(url, params);

    check(request, {
    'El código de respuesta es 200': (r) => r.status === 200,

});

if(request.status!== 200)
    {
        if(request.status === 500) {
            errores500.add(1);
        } else if (request.status === 401){
            errores401.add(1);
        } else if (request.status === 0){
            erroresTimeout.add(1);
        } else {
            erroresOtros.add(1);
            console.log((`Codigo es: ${request.status}`))
        }

    }

sleep(1);

}