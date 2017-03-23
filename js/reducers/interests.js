import { LIST_INTEREST_PENDING, LIST_INTEREST_FULFILLED, LIST_INTEREST_REJECTED,
         DESTROY_INTEREST_PENDING, DESTROY_INTEREST_FULFILLED, DESTROY_INTEREST_REJECTED,
         CREATE_INTEREST_FULFILLED
} from '../constants/interests'

const INITIAL_STATE = {
    interestList: {pending: false, fulfilled: false, error: null, interests: []},
    interestDestroy: {pending: false, fulfilled: false, error: null, interests: []},
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
            return {...state, interestDestroy: {pending: true, fulfilled: false, error: null, interests: state.interestDestroy.interests.concat(action.meta.id)}}
        case DESTROY_INTEREST_FULFILLED:
            return {
                ...state,
                interestDestroy: {pending: false, fulfilled: true, error: null, interests: state.interestDestroy.interests.filter(interest => interest.id !== action.meta.id)},
                interestList: {...state.interestList, interests: state.interestList.interests.filter(interest => interest.id !== action.meta.id)},
            }
        case DESTROY_INTEREST_REJECTED:
            return {...state, interestDestroy: {pending: false, fulfilled: false, error: action.payload.response, interests: state.interestDestroy.interests.filter(interest => interest.id !== action.meta.id)}}

        // CREATE
        case CREATE_INTEREST_FULFILLED:
            return {
                ...state,
                interestList: {...state.interestList, interests: state.interestList.interests.concat(action.payload.data)},
            }

        default:
            return state
    }
}
