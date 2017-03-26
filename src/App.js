import React from 'react';
import AppBase from './base/AppBase';
import Feed from './components/Feed';
import Login from './components/Login';

class App extends AppBase {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        }
    }

    componentWillMount() {
        if (localStorage.getItem("user") === null) {
            this.setState({loggedIn: true});
            //TODO: check if user in db go to feed, else go to register
        }
    }

    render() {
        return this.state.loggedIn === false ? <Login/> : <Feed/>;
    }
}

export default App;
