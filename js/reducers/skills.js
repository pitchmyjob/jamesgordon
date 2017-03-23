import { LIST_SKILL_PENDING, LIST_SKILL_FULFILLED, LIST_SKILL_REJECTED,
         DESTROY_SKILL_PENDING, DESTROY_SKILL_FULFILLED, DESTROY_SKILL_REJECTED,
         CREATE_SKILL_FULFILLED
} from '../constants/skills'

const INITIAL_STATE = {
    skillList: {pending: false, fulfilled: false, error: null, skills: []},
    skillDestroy: {pending: false, fulfilled: false, error: null, skills: []},
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
            return {...state, skillDestroy: {pending: true, fulfilled: false, error: null, skills: state.skillDestroy.skills.concat(action.meta.id)}}
        case DESTROY_SKILL_FULFILLED:
            return {
                ...state,
                skillDestroy: {pending: false, fulfilled: true, error: null, skills: state.skillDestroy.skills.filter(skill => skill.id !== action.meta.id)},
                skillList: {...state.skillList, skills: state.skillList.skills.filter(skill => skill.id !== action.meta.id)},
            }
        case DESTROY_SKILL_REJECTED:
            return {...state, skillDestroy: {pending: false, fulfilled: false, error: action.payload.response, skills: state.skillDestroy.skills.filter(skill => skill.id !== action.meta.id)}}

        // CREATE
        case CREATE_SKILL_FULFILLED:
            return {
                ...state,
                skillList: {...state.skillList, skills: state.skillList.skills.concat(action.payload.data)},
            }

        default:
            return state
    }
}
