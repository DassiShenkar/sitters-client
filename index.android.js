import React, { Component } from 'react';
import App from './native/App'

import { AppRegistry } from 'react-native';


export default class Sitters extends Component {
  render() {
    return (
        <App />
    );
  }
}

AppRegistry.registerComponent('Sitters', () => Sitters);