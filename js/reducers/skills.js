import { LIST_SKILL_PENDING, LIST_SKILL_FULFILLED, LIST_SKILL_REJECTED } from '../constants/skills'

const INITIAL_STATE = {
    skillList: {pending: false, fulfilled: false, error: null, skills: []},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_SKILL_PENDING:
            return {...state, skillList: {pending: true, fulfilled: false, error: null, skills: []}}
        case LIST_SKILL_FULFILLED:
            return {...state, skillList: {pending: false, fulfilled: true, error: null, skills: action.payload.data}}
        case LIST_SKILL_REJECTED:
            return {...state, skillList: {pending: false, fulfilled: false, error: action.payload.response, skills: [], pagination: null}}
        default:
            return state
    }
}
