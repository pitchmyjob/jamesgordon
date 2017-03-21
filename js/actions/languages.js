import request from '../utils/request'

import { LIST_LANGUAGE } from '../constants/languages'

export const listLanguage = () => {
    return {
        type: LIST_LANGUAGE,
        payload: request.get('/applicantlanguages/')
    }
}
