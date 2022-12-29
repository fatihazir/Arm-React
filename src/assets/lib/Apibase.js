import axios from 'axios';
import { baseUrlForEndpoint } from './Constants';

class Apibase {

    Post = async ({ url, body, successFunction, errorFunction, exceptionFunction }) => {

        fetch(baseUrlForEndpoint + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    successFunction(data)
                } else {
                    errorFunction(data)
                }
            })
            .catch((error) => {
                exceptionFunction(error)
            });
    }
}

export default new Apibase