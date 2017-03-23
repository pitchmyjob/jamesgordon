import request from '../utils/request'

import { LIST_CANDIDACY } from '../constants/candidacies'

export const listCandidacy = () => {
    return {
        type: LIST_CANDIDACY,
        payload: request.get('/applicant/candidacies/')
    }
}
