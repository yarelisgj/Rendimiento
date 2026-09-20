import http from 'k6/http';
import { URL_BASE } from '../configuration/config.js';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const errores502 = new Counter('registro_502_error_servidor');

export const options = { 
    stages:[
    { duration: '3m', target: 1200 },
    { duration: '3m', target: 1200 },
    { duration: '1m', target: 0 },
    ],
};


export default function () {

    const allIngredients = ['mozzarella', 'topping', 'olive_oil', 'tomato'];
    const indice =(__ITER) % allIngredients.length;
    const ingredient = allIngredients[indice];

    const url = `${URL_BASE}/api/ingredients/${ingredient}`;

    const params = {
        headers:{
        'accept': 'application/json',
        'Authorization': 'token abcdef0123456789',
        },
    };

    const request = http.get(url, params);

    check(request, {
    'el código de respuesta es 200': (r) => r.status === 200

});

if(request.status === 502)
{
    errores502.add(1);
}

sleep(1);

}