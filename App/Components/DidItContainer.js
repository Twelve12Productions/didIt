import { connect } from 'react-redux';
import DidIt from './DidIt';

import { getDidIt, setPerson, postDidIt } from './../redux/ducks/didIt'

export default connect(
    (state) => ({
        didIt: state.didIt
    }),
    (dispatch) => ({
        setPerson:      (person) => dispatch(setPerson(person)),
        getDidIt:       (id) => dispatch(getDidIt(id)),
        incrementDidIt: (person) => dispatch(postDidIt(Object.assign({}, person, {
            times: person.times + 1
        })))
    })
)(DidIt);
