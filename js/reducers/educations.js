import { LIST_EDUCATION_PENDING, LIST_EDUCATION_FULFILLED, LIST_EDUCATION_REJECTED,
         CREATE_EDUCATION_FULFILLED,
         UPDATE_EDUCATION_FULFILLED,
         DESTROY_EDUCATION_PENDING, DESTROY_EDUCATION_FULFILLED, DESTROY_EDUCATION_REJECTED,
} from '../constants/educations'

const INITIAL_STATE = {
    educationList: {pending: false, fulfilled: false, error: null, educations: []},
    educationDestroy: {pending: false, fulfilled: false, error: null, educations: []},
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        // LIST
        case LIST_EDUCATION_PENDING:
            return {...state, educationList: {pending: true, fulfilled: false, error: null, educations: []}}
        case LIST_EDUCATION_FULFILLED:
            return {...state, educationList: {pending: false, fulfilled: true, error: null, educations: action.payload.data}}
        case LIST_EDUCATION_REJECTED:
            return {...state, educationList: {pending: false, fulfilled: false, error: action.payload.response, educations: [], pagination: null}}

        // CREATE
        case CREATE_EDUCATION_FULFILLED:
            return {
                ...state,
                educationList: {...state.educationList, educations: state.educationList.educations.concat(action.payload.data)},
            }

        // UPDATE
        case UPDATE_EDUCATION_FULFILLED:
            return {
                ...state,
                educationList: {
                    ...state.educationList,
                    educations: state.educationList.educations.map((education) => {
                        if (education.id === action.meta.id) {
                            return action.payload.data;
                        }
                        else {
                            return education;
                        }
                    })
                },
            }

        // DESTROY
        case DESTROY_EDUCATION_PENDING:
            return {...state, educationDestroy: {pending: true, fulfilled: false, error: null, educations: state.educationDestroy.educations.concat(action.meta.id)}}
        case DESTROY_EDUCATION_FULFILLED:
            return {
                ...state,
                educationDestroy: {pending: false, fulfilled: true, error: null, educations: state.educationDestroy.educations.filter(education => education.id !== action.meta.id)},
                educationList: {...state.educationList, educations: state.educationList.educations.filter(education => education.id !== action.meta.id)},
            }
        case DESTROY_EDUCATION_REJECTED:
            return {...state, educationDestroy: {pending: false, fulfilled: false, error: action.payload.response, educations: state.educationDestroy.educations.filter(education => education.id !== action.meta.id)}}

        default:
            return state
    }
}
