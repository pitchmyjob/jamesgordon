import request from '../utils/request'

import { LIST_SKILL } from '../constants/skills'

export const listSkill = () => {
    return {
        type: LIST_SKILL,
        payload: request.get('/applicantskills/')
    }
}
