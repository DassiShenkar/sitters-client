import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TextButton from '../components/TextButton';
import Logo from '../components/Logo';

class ErrorPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ styles.container }>
                <Logo
                    companyName="Sitters" />
                <Image
                    style={styles.image}
                    source={require('../style/icons/crying.png')}
                />
                <Text style={styles.errorNumText}>{ this.props.errorNum }</Text>
                <Text style={ styles.errorMsgText }>{ this.props.errorMsg }</Text>
                <TextButton
                    onPress={ Actions.Splash }
                    text="Press here to retry" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 90,
        height: 70,
        marginBottom: 20
    },
    errorNumText: {
        fontSize: 24,
        color: '#f86966',
        fontWeight: 'bold',
        margin: 10,
        fontFamily: 'OpenSans-Regular'
    },
    errorMsgText: {
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,
        color: '#757575',
        fontFamily: 'OpenSans-Regular'
    }
});

export default ErrorPage;