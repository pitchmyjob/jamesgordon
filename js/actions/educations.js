import request from '../utils/request'

import { LIST_EDUCATION,CREATE_EDUCATION, UPDATE_EDUCATION, DESTROY_EDUCATION } from '../constants/educations'

export const listEducation = () => {
    return {
        type: LIST_EDUCATION,
        payload: request.get('/applicanteducations/')
    }
}

export const createEducation = (values) => {
    return {
        type: CREATE_EDUCATION,
        payload: request.post('/applicanteducations/', values)
    }
}

export const updateEducation = (educationId, values) => {
    return {
        type: UPDATE_EDUCATION,
        payload: request.put('/applicanteducations/' + educationId + '/', values),
        meta: {
            id: educationId,
        },
    }
}

export const destroyEducation = (id) => {
    return {
        type: DESTROY_EDUCATION,
        payload: request.delete('/applicanteducations/' + id + '/'),
        meta: {
            id: id,
        },
    }
}
