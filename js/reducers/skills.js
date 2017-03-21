import { LIST_SKILL_PENDING, LIST_SKILL_FULFILLED, LIST_SKILL_REJECTED,
         DESTROY_SKILL_PENDING, DESTROY_SKILL_FULFILLED, DESTROY_SKILL_REJECTED
} from '../constants/skills'

const INITIAL_STATE = {
    skillList: {pending: false, fulfilled: false, error: null, skills: []},
    skillActive: {pending: false, fulfilled: false, error: null, skill: null},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_SKILL_PENDING:
            return {...state, skillList: {pending: true, fulfilled: false, error: null, skills: []}}
        case LIST_SKILL_FULFILLED:
            return {...state, skillList: {pending: false, fulfilled: true, error: null, skills: action.payload.data}}
        case LIST_SKILL_REJECTED:
            return {...state, skillList: {pending: false, fulfilled: false, error: action.payload.response, skills: []}}

        // DESTROY
        case DESTROY_SKILL_PENDING:
            return {...state, skillActive: {pending: true, fulfilled: false, error: null, skill: state.skillList.skills.find((skill) => { return skill.id === action.meta.id })}}
        case DESTROY_SKILL_FULFILLED:
            return {...state, skillActive: {pending: false, fulfilled: true, error: null, skill: null}, skillList: {...state.skillList, skills: state.skillList.skills.filter((skill) => { return skill.id !== action.meta.id })}}
        case DESTROY_SKILL_REJECTED:
            return {...state, skillActive: {pending: false, fulfilled: false, error: action.payload.response, skill: null}}

        default:
            return state
    }
}
