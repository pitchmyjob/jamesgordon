import request from '../utils/request'

import { LIST_INTEREST } from '../constants/interests'

export const listInterest = () => {
    return {
        type: LIST_INTEREST,
        payload: request.get('/applicantinterests/')
    }
}
