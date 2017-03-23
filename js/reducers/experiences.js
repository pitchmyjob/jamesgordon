import { LIST_EXPERIENCE_PENDING, LIST_EXPERIENCE_FULFILLED, LIST_EXPERIENCE_REJECTED,
         CREATE_EXPERIENCE_FULFILLED,
         UPDATE_EXPERIENCE_FULFILLED,
         DESTROY_EXPERIENCE_PENDING, DESTROY_EXPERIENCE_FULFILLED, DESTROY_EXPERIENCE_REJECTED,
} from '../constants/experiences'

const INITIAL_STATE = {
    experienceList: {pending: false, fulfilled: false, error: null, experiences: []},
    experienceDestroy: {pending: false, fulfilled: false, error: null, experiences: []},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_EXPERIENCE_PENDING:
            return {...state, experienceList: {pending: true, fulfilled: false, error: null, experiences: []}}
        case LIST_EXPERIENCE_FULFILLED:
            return {...state, experienceList: {pending: false, fulfilled: true, error: null, experiences: action.payload.data}}
        case LIST_EXPERIENCE_REJECTED:
            return {...state, experienceList: {pending: false, fulfilled: false, error: action.payload.response, experiences: [], pagination: null}}

        // CREATE
        case CREATE_EXPERIENCE_FULFILLED:
            return {
                ...state,
                experienceList: {...state.experienceList, experiences: state.experienceList.experiences.concat(action.payload.data)},
            }

        // UPDATE
        case UPDATE_EXPERIENCE_FULFILLED:
            return {
                ...state,
                experienceList: {
                    ...state.experienceList,
                    experiences: state.experienceList.experiences.map((experience) => {
                        if (experience.id === action.meta.id) {
                            return action.payload.data;
                        }
                        else {
                            return experience;
                        }
                    })
                },
            }

        // DESTROY
        case DESTROY_EXPERIENCE_PENDING:
            return {...state, experienceDestroy: {pending: true, fulfilled: false, error: null, experiences: state.experienceDestroy.experiences.concat(action.meta.id)}}
        case DESTROY_EXPERIENCE_FULFILLED:
            return {
                ...state,
                experienceDestroy: {pending: false, fulfilled: true, error: null, experiences: state.experienceDestroy.experiences.filter(experience => experience.id !== action.meta.id)},
                experienceList: {...state.experienceList, experiences: state.experienceList.experiences.filter(experience => experience.id !== action.meta.id)},
            }
        case DESTROY_EXPERIENCE_REJECTED:
            return {...state, experienceDestroy: {pending: false, fulfilled: false, error: action.payload.response, experiences: state.experienceDestroy.experiences.filter(experience => experience.id !== action.meta.id)}}

        default:
            return state
    }
}
