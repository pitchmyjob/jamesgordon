import axios from 'axios'

const API_ROOT_URL = 'http://192.168.56.111:8000/api/'

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
