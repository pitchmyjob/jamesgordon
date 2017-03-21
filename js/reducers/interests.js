import { LIST_INTEREST_PENDING, LIST_INTEREST_FULFILLED, LIST_INTEREST_REJECTED,
         DESTROY_INTEREST_PENDING, DESTROY_INTEREST_FULFILLED, DESTROY_INTEREST_REJECTED
} from '../constants/interests'

const INITIAL_STATE = {
    interestList: {pending: false, fulfilled: false, error: null, interests: []},
    interestActive: {pending: false, fulfilled: false, error: null, interest: null},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_INTEREST_PENDING:
            return {...state, interestList: {pending: true, fulfilled: false, error: null, interests: []}}
        case LIST_INTEREST_FULFILLED:
            return {...state, interestList: {pending: false, fulfilled: true, error: null, interests: action.payload.data}}
        case LIST_INTEREST_REJECTED:
            return {...state, interestList: {pending: false, fulfilled: false, error: action.payload.response, interests: [], pagination: null}}

        // DESTROY
        case DESTROY_INTEREST_PENDING:
            return {...state, interestActive: {pending: true, fulfilled: false, error: null, interest: state.interestList.interests.find((interest) => { return interest.id === action.meta.id })}}
        case DESTROY_INTEREST_FULFILLED:
            return {...state, interestActive: {pending: false, fulfilled: true, error: null, interest: null}, interestList: {...state.interestList, interests: state.interestList.interests.filter((interest) => { return interest.id !== action.meta.id })}}
        case DESTROY_INTEREST_REJECTED:
            return {...state, interestActive: {pending: false, fulfilled: false, error: action.payload.response, interest: null}}

        default:
            return state
    }
}
