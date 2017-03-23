import { LIST_LANGUAGE_PENDING, LIST_LANGUAGE_FULFILLED, LIST_LANGUAGE_REJECTED,
         CREATE_LANGUAGE_FULFILLED,
         UPDATE_LANGUAGE_FULFILLED,
         DESTROY_LANGUAGE_PENDING, DESTROY_LANGUAGE_FULFILLED, DESTROY_LANGUAGE_REJECTED,
} from '../constants/languages'

const INITIAL_STATE = {
    languageList: {pending: false, fulfilled: false, error: null, languages: []},
    languageActive: {pending: false, fulfilled: false, error: null, language: null},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_LANGUAGE_PENDING:
            return {...state, languageList: {pending: true, fulfilled: false, error: null, languages: []}}
        case LIST_LANGUAGE_FULFILLED:
            return {...state, languageList: {pending: false, fulfilled: true, error: null, languages: action.payload.data}}
        case LIST_LANGUAGE_REJECTED:
            return {...state, languageList: {pending: false, fulfilled: false, error: action.payload.response, languages: [], pagination: null}}

        // CREATE
        case CREATE_LANGUAGE_FULFILLED:
            return {
                ...state,
                languageList: {...state.languageList, languages: state.languageList.languages.concat(action.payload.data)},
            }

        // UPDATE
        case UPDATE_LANGUAGE_FULFILLED:
            return {
                ...state,
                languageList: {
                    ...state.languageList,
                    languages: state.languageList.languages.map((language) => {
                        if (language.id === action.meta.id) {
                            return action.payload.data;
                        }
                        else {
                            return language;
                        }
                    })
                },
            }

        // DESTROY
        case DESTROY_LANGUAGE_PENDING:
            return {...state, languageActive: {pending: true, fulfilled: false, error: null, language: state.languageList.languages.find((language) => { return language.id === action.meta.id })}}
        case DESTROY_LANGUAGE_FULFILLED:
            return {...state, languageActive: {pending: false, fulfilled: true, error: null, language: null}, languageList: {...state.languageList, languages: state.languageList.languages.filter((language) => { return language.id !== action.meta.id })}}
        case DESTROY_LANGUAGE_REJECTED:
            return {...state, languageActive: {pending: false, fulfilled: false, error: action.payload.response, language: null}}

        default:
            return state
    }
}
