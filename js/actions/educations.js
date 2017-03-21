import request from '../utils/request'

import { LIST_EDUCATION } from '../constants/educations'

export const listEducation = () => {
    return {
        type: LIST_EDUCATION,
        payload: request.get('/applicanteducations/')
    }
}
