import { LIST_EDUCATION_PENDING, LIST_EDUCATION_FULFILLED, LIST_EDUCATION_REJECTED } from '../constants/educations'

const INITIAL_STATE = {
    educationList: {pending: false, fulfilled: false, error: null, educations: []},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_EDUCATION_PENDING:
            return {...state, educationList: {pending: true, fulfilled: false, error: null, educations: []}}
        case LIST_EDUCATION_FULFILLED:
            return {...state, educationList: {pending: false, fulfilled: true, error: null, educations: action.payload.data}}
        case LIST_EDUCATION_REJECTED:
            return {...state, educationList: {pending: false, fulfilled: false, error: action.payload.response, educations: [], pagination: null}}
        default:
            return state
    }
}
