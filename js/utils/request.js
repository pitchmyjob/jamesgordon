import axios from 'axios'

const API_ROOT_URL = 'http://barneystinson.eu-west-1.elasticbeanstalk.com/api/'

let HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

// if (!!localStorage.token) {
HEADERS['Authorization'] = 'Token e51f21c9a4840a6b3a1a26cc3c4fed426e3dad85'
// }

export default axios.create({
    baseURL: API_ROOT_URL,
    timeout: 10000,
    withCredentials: true,
    headers: HEADERS,
})
