import request from '../utils/request'

import { LIST_LANGUAGE, CREATE_LANGUAGE, UPDATE_LANGUAGE, DESTROY_LANGUAGE } from '../constants/languages'

export const listLanguage = () => {
    return {
        type: LIST_LANGUAGE,
        payload: request.get('/applicantlanguages/')
    }
}

export const createLanguage = (values) => {
    return {
        type: CREATE_LANGUAGE,
        payload: request.post('/applicantlanguages/', values)
    }
}

export const updateLanguage = (id, values) => {
    return {
        type: UPDATE_LANGUAGE,
        payload: request.put('/applicantlanguages/' + id + '/', values),
        meta: {
            id: id,
        },
    }
}

export const destroyLanguage = (id) => {
    return {
        type: DESTROY_LANGUAGE,
        payload: request.delete('/applicantlanguages/' + id + '/'),
        meta: {
            id: id,
        },
    }
}
