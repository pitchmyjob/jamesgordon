import { LIST_CANDIDACY_PENDING, LIST_CANDIDACY_FULFILLED, LIST_CANDIDACY_REJECTED } from '../constants/candidacies'

const INITIAL_STATE = {
    candidacyList: {pending: false, fulfilled: false, error: null, candidacies: []},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_CANDIDACY_PENDING:
            return {...state, candidacyList: {pending: true, fulfilled: false, error: null, candidacies: []}}
        case LIST_CANDIDACY_FULFILLED:
            return {...state, candidacyList: {pending: false, fulfilled: true, error: null, candidacies: action.payload.data}}
        case LIST_CANDIDACY_REJECTED:
            return {...state, candidacyList: {pending: false, fulfilled: false, error: action.payload.response, candidacies: []}}

        default:
            return state
    }
}
