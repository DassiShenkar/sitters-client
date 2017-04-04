import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Login from './components/Login'
import RadioButtons from './components/RadioButton'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Image
            style={styles.img}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
        />
        <RadioButtons
            values={[
              {label: 'I\'m A Parent', value: 0 },
              {label: 'I\'m A Sitter', value: 1 }
            ]}
        />
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
