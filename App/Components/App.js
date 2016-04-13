import React, { Component, View, Text } from 'react-native';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../redux/rootReducer';
import DidItContainer from './DidItContainer';
import api from './../middleware/api';

let middleware = [
    api,
    thunk
];

const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware)
)(createStore);

const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <DidItContainer/>
            </Provider>
        );
    }
}
