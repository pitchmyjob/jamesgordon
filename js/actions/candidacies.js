import request from '../utils/request'

import { LIST_CANDIDACY, LIKE_CANDIDACY, POSTULATE_CANDIDACY } from '../constants/candidacies'

export const listCandidacy = (status = null) => {
    let args = {params: {}}
    if (status) {
        args['params']['status'] = status
    }

    return {
        type: LIST_CANDIDACY,
        payload: request.get('/applicant/candidacies/', args),
    };
};

export const likeCandidacy = (id) => {
    return {
        type: LIKE_CANDIDACY,
        payload: request.put('/applicant/candidacy/' + id + '/like/', {}),
        meta: {
            id: id,
        },
    };
};

export const postulateCandidacy = (id) => {
    return {
        type: POSTULATE_CANDIDACY,
        payload: request.put('/applicant/candidacy/' + id + '/postulate/', {}),
        meta: {
            id: id,
        },
    };
};
