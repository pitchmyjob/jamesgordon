import { LIST_INTEREST_PENDING, LIST_INTEREST_FULFILLED, LIST_INTEREST_REJECTED } from '../constants/interests'

const INITIAL_STATE = {
    interestList: {pending: false, fulfilled: false, error: null, interests: []},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_INTEREST_PENDING:
            return {...state, interestList: {pending: true, fulfilled: false, error: null, interests: []}}
        case LIST_INTEREST_FULFILLED:
            return {...state, interestList: {pending: false, fulfilled: true, error: null, interests: action.payload.data}}
        case LIST_INTEREST_REJECTED:
            return {...state, interestList: {pending: false, fulfilled: false, error: action.payload.response, interests: [], pagination: null}}
        default:
            return state
    }
}
