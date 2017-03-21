import request from '../utils/request'

import { LIST_EXPERIENCE } from '../constants/experiences'

export const listExperience = () => {
    return {
        type: LIST_EXPERIENCE,
        payload: request.get('/applicantexperiences/')
    }
}
