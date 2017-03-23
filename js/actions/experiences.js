import request from '../utils/request'

import { LIST_EXPERIENCE, CREATE_EXPERIENCE, UPDATE_EXPERIENCE, DESTROY_EXPERIENCE } from '../constants/experiences'

export const listExperience = () => {
    return {
        type: LIST_EXPERIENCE,
        payload: request.get('/applicantexperiences/')
    }
}

export const createExperience = (values) => {
    return {
        type: CREATE_EXPERIENCE,
        payload: request.post('/applicantexperiences/', values)
    }
}

export const updateExperience = (experienceId, values) => {
    return {
        type: UPDATE_EXPERIENCE,
        payload: request.put('/applicantexperiences/' + experienceId + '/', values),
        meta: {
            id: experienceId,
        },
    }
}

export const destroyExperience = (id) => {
    return {
        type: DESTROY_EXPERIENCE,
        payload: request.delete('/applicantexperiences/' + id + '/'),
        meta: {
            id: id,
        },
    }
}
