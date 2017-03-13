import React, { Component } from 'react';
import AppBase from './base/AppBase.js';
import FBLogin from './components/FBlogin';

class App extends AppBase {

    constructor() {
        super();
    }

    render() {
        return (
                <FBLogin/>
        );
    }
}

export default App;
