import React, { Component, StyleSheet, Text, View, TextInput, TouchableHighlight, ActivityIndicatorIOS, AsyncStorage } from 'react-native';

import { DID_IT } from './../constants/strings';
import { randomGuid } from './../convenience/functions';

const styles = StyleSheet.create({
    mainContainer: {
        flex:            1,
        padding:         30,
        marginTop:       65,
        flexDirection:   'column',
        justifyContent:  'center',
        backgroundColor: '#282828'
    },
    title:         {
        marginBottom: 20,
        fontSize:     25,
        textAlign:    'center',
        color:        '#fff'
    },
    buttonText:    {
        fontSize:      18,
        color:         '#111',
        alignSelf:     'center',
        letterSpacing: 2
    },
    button:        {
        height:          45,
        flexDirection:   'row',
        backgroundColor: 'white',
        borderColor:     'white',
        borderWidth:     1,
        borderRadius:    8,
        marginBottom:    10,
        marginTop:       10,
        alignSelf:       'stretch',
        justifyContent:  'center'
    }
});

export default class DidIt extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { getDidIt, setPerson } = this.props,
            personId;

        AsyncStorage.getItem(DID_IT, (err, result) => {
            personId = result;
        });

        if (!personId) {
            personId = randomGuid();
            AsyncStorage.setItem(DID_IT, personId);
        } else {
            getDidIt(personId);
        }

        setPerson({ id: personId, times: 0 });
    }

    componentDidUpdate(previousProps, previousState) {
        let { didIt: { person, personNotFound }, incrementDidIt } = this.props;

        if (personNotFound && previousProps.didIt.personNotFound !== personNotFound) {
            incrementDidIt(person);
        }
    }

    didIt() {
        this.props.incrementDidIt(this.props.didIt.person);
    }

    render() {
        let { didIt: { person, processing } } = this.props,
            { times } = person;

        return (
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.title}>You did it: {times}</Text>
                    <TouchableHighlight style={styles.button} onPress={() => this.didIt()} underlayColor="white" disabled={processing}>
                        <Text style={styles.buttonText}>I did it</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
