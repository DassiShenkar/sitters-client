import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import AppBase from './base/AppBase.js';
import FBLogin from './components/FBlogin';
import Nav from './components/Nav';
import SitterList from './components/SitterList';
import RadioInput from './components/controllers/RadioInput';
import strings from './static/strings';



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

    changeStatus() {
        this.setState({loggedIn: true});
    }

    render() {
        let sitters = [{
            name: "arel",
            matchScore: 85,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Japan_small_icon.png"
        }, {
            name: "arel1",
            matchScore: 80,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Japan_small_icon.png"
        }, {
            name: "arel2",
            matchScore: 75,
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Japan_small_icon.png"
        }];
        let login;
        const style = {
            width: '80%',
            margin: 'auto'
        };
        if (this.state.loggedIn === false) {
            login =
                <div style={style}>
                    <PageHeader>Sitters<small>{strings.APP_DESCRIPTION}</small></PageHeader>
                    <Jumbotron>
                        <h1>Login</h1>
                        <RadioInput ref="userInput" types={['I\'m a Parent', 'I\'m a Sitter']} default={'I\'m a Parent'}
                                    saveInLocalStorage={'true'} radioName="userType"/>
                        <FBLogin myFunc={this.changeStatus.bind(this)}/>
                    </Jumbotron>
                </div>
        }
        else {
            login = <div>
                <h1>Feed</h1>
                <Nav name="Arel"
                     image="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTYLooZuD2jyZ_RGPegqe1mmDhavIfmZeSpjYLsjSfsKRHpXcffHmMrmA"
                     alt="Arel"/>
                <SitterList sitters={sitters}/>
            </div>;
        }
        return (<div>
                {login}
            </div>
        );
    }
}

export default App;
