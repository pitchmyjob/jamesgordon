import request from '../utils/request'

import { LIST_INTEREST, DESTROY_INTEREST } from '../constants/interests'

export const listInterest = () => {
    return {
        type: LIST_INTEREST,
        payload: request.get('/applicantinterests/')
    }
}

export const destroyInterest = (id) => {
    return {
        type: DESTROY_INTEREST,
        payload: request.delete('/applicantinterests/' + id + '/'),
        meta: {
            id: id,
        },
    }
}
