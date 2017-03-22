import request from '../utils/request'

import { LIST_SKILL, DESTROY_SKILL, CREATE_SKILL } from '../constants/skills'

export const listSkill = () => {
    return {
        type: LIST_SKILL,
        payload: request.get('/applicantskills/')
    }
}

export const destroySkill = (id) => {
    return {
        type: DESTROY_SKILL,
        payload: request.delete('/applicantskills/' + id + '/'),
        meta: {
            id: id,
        },
    }
}

export const createSkill = (values) => {
    return {
        type: CREATE_SKILL,
        payload: request.post('/applicantskills/', values)
    }
}
