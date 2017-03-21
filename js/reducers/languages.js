import { LIST_LANGUAGE_PENDING, LIST_LANGUAGE_FULFILLED, LIST_LANGUAGE_REJECTED } from '../constants/languages'

const INITIAL_STATE = {
    languageList: {pending: false, fulfilled: false, error: null, languages: []},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_LANGUAGE_PENDING:
            return {...state, languageList: {pending: true, fulfilled: false, error: null, languages: []}}
        case LIST_LANGUAGE_FULFILLED:
            return {...state, languageList: {pending: false, fulfilled: true, error: null, languages: action.payload.data}}
        case LIST_LANGUAGE_REJECTED:
            return {...state, languageList: {pending: false, fulfilled: false, error: action.payload.response, languages: [], pagination: null}}
        default:
            return state
    }
}
