import { post, get } from './../../convenience/functions';
import { MONGO_LAB } from '../../constants/endpoints';

const POST_DID_IT_REQUEST = 'POST_DID_IT_REQUEST';
const POST_DID_IT_SUCCESS = 'POST_DID_IT_SUCCESS';
const POST_DID_IT_FAIL = 'POST_DID_IT_FAIL';

const GET_DID_IT_REQUEST = 'GET_DID_IT_REQUEST';
const GET_DID_IT_SUCCESS = 'GET_DID_IT_SUCCESS';
const GET_DID_IT_FAIL = 'GET_DID_IT_FAIL';

const SET_PERSON = 'SET_PERSON';
const COLLECTION_NAME = 'DidIt';
const PROPERTY_NAME = 'id';

const initialState = {
    person:         {
        id:    '',
        times: 0
    },
    processing:     false,
    postSuccess:    false,
    personNotFound: false,
    error:          false
};

export default (state = initialState, action = null) => {
    switch( action.type ) {
        case SET_PERSON:
            return Object.assign({}, state, {
                person: action.person
            });
        case GET_DID_IT_REQUEST:
            return Object.assign({}, state, {
                person:     {
                    id: action.payload
                },
                processing: !initialState.processing
            });
        case GET_DID_IT_SUCCESS:
            return Object.assign({}, state, {
                person:     action.response[0],
                processing: initialState.processing,
                error:      initialState.error
            });
        case GET_DID_IT_FAIL:
            let personNotFound = false;

            if ( action.error.message === 'Document not found' ) {
                personNotFound = true;
            }

            return Object.assign({}, state, {
                error:      true,
                processing: initialState.processing,
                            personNotFound
            });
        case POST_DID_IT_SUCCESS:
            return Object.assign({}, state, {
                person:      action.response,
                processing:  initialState.processing,
                postSuccess: true,
                error:       initialState.error
            });
        case POST_DID_IT_REQUEST:
            return Object.assign({}, state, {
                postSuccess: initialState.postSuccess,
                processing:  !initialState.processing,
                error:       false
            });
        case POST_DID_IT_FAIL:
            return Object.assign({}, state, {
                postSuccess: initialState.postSuccess,
                processing:  initialState.processing,
                error:       true
            });
        default:
            return state;
    }
};

export const setPerson = (person) => ({
    type: SET_PERSON,
          person
});

export const getDidIt = (id) => (get([GET_DID_IT_REQUEST, GET_DID_IT_SUCCESS, GET_DID_IT_FAIL], MONGO_LAB(COLLECTION_NAME, PROPERTY_NAME, id)));
export const postDidIt = (data) => post(data, [POST_DID_IT_REQUEST, POST_DID_IT_SUCCESS, POST_DID_IT_FAIL], MONGO_LAB(COLLECTION_NAME));
